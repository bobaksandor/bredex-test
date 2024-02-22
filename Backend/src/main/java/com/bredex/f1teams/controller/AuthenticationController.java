package com.bredex.f1teams.controller;

import com.bredex.f1teams.exception.UserAlreadyExists;
import com.bredex.f1teams.model.request.RegistrationRequest;
import com.bredex.f1teams.model.response.LoginRequest;
import com.bredex.f1teams.repository.UserRepository;
import com.bredex.f1teams.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;
	private final UserRepository userRepository;

	@PostMapping("/registration")
	public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) {

		try {

			return ResponseEntity
					.status(HttpStatus.OK)
					.body(authenticationService.register(request));

		} catch (UserAlreadyExists ex) {

			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST)
					.body(ex.getMessage());

		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

		return authenticationService.authenticate(request);
	}

	@GetMapping("get-authenticated-user")
	@PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
	public ResponseEntity<?> getAuthenticatedUser(
			@AuthenticationPrincipal final UserDetails userDetails
	) {

		final var user = userRepository
				.findByUsername(userDetails.getUsername())
				.orElse(null);

		if (user != null) {

			return ResponseEntity.ok(user);

		} else {

			final var message = "There isn't any user in the database with the given username.";
			return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body(message);

		}

	}
}