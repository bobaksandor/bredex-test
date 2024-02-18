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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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

		} catch (Exception ex) {

			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ex.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

		return authenticationService.authenticate(request);
	}
}