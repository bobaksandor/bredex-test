package com.bredex.f1teams.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request,
	                   HttpServletResponse response,
	                   AccessDeniedException ex
	) throws IOException, ServletException {

		final var message = "You are not authorized to access this endpoint.";

		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.getWriter().write(message);
	}
}