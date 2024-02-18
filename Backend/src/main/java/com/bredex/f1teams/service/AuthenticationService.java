package com.bredex.f1teams.service;

import com.bredex.f1teams.exception.UserAlreadyExists;
import com.bredex.f1teams.model.entity.User;
import com.bredex.f1teams.model.enums.Role;
import com.bredex.f1teams.model.request.RegistrationRequest;
import com.bredex.f1teams.model.response.AuthenticationResponse;
import com.bredex.f1teams.model.response.LoginRequest;
import com.bredex.f1teams.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@Transactional
	public AuthenticationResponse register(RegistrationRequest request) {

		var user = userRepository
				.findByUsername(request.getUsername())
				.orElse(null);

		if (user != null) {

			final var message = "Username is taken.";

			throw new UserAlreadyExists(message);
		}

		user = userRepository
				.findByEmail(request.getEmail())
				.orElse(null);

		if (user != null) {

			final var message = "Username is taken.";

			throw new UserAlreadyExists(message);
		}

		user = User.builder()
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.username(request.getUsername())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(Role.USER)
				.createdAt(new Date(System.currentTimeMillis()))
				.updatedAt(new Date(System.currentTimeMillis()))
				.build();

		userRepository.save(user);

		final var jwtToken = jwtService.generateToken(user);

		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}

	public ResponseEntity<?> authenticate(LoginRequest request) {

		try {

			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							request.getUsername(),
							request.getPassword()
					)
			);

		} catch (Exception e) {

			final var message = "Wrong username or password.";
			return ResponseEntity
					.status(HttpStatus.UNAUTHORIZED)
					.body(message);
		}

		var user = userRepository.findByUsername(request.getUsername()).orElse(null);

		if (user == null) {

			final var message = "Wrong username or password.";
			return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body(message);
		}

		final var jwtToken = jwtService.generateToken(user);

		final var response = AuthenticationResponse.builder()
				.token(jwtToken)
				.build();

		return ResponseEntity.ok(response);
	}

}