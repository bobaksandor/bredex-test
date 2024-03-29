package com.bredex.f1teams.config;

import com.bredex.f1teams.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request,
			@NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain
	) throws ServletException, IOException {

		try {

			final var authHeader = request.getHeader("Authorization");

			if (authHeader == null || !authHeader.startsWith("Bearer ")) {

				filterChain.doFilter(request, response);

				return;
			}

			final var jwt = authHeader.substring(7);

			final var userName = jwtService.extractUsername(jwt);

			if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {

				final var userDetails = this.userDetailsService.loadUserByUsername(userName);

				if (jwtService.isTokenValid(jwt, userDetails)) {

					final var authToken = new UsernamePasswordAuthenticationToken(
							userDetails,
							null,
							userDetails.getAuthorities()
					);

					authToken.setDetails(
							new WebAuthenticationDetailsSource().buildDetails(request)
					);

					SecurityContextHolder.getContext().setAuthentication(authToken);
				}
			}

			filterChain.doFilter(request, response);

		} catch (ExpiredJwtException ex) {

			final var message = "Authentication expired at "
					+ ex.getClaims().getExpiration()
					+ ". Current time: " + new Date();

			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write(message);

		} catch (UsernameNotFoundException ex) {

			final var message = "You are logged out. Please log in again.";

			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write(message);

		} catch (MalformedJwtException ex) {

			final var message = "The jwt provided is not valid.";

			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write(message);

		} catch (Exception ex) {

			throw ex;
		}
	}
}