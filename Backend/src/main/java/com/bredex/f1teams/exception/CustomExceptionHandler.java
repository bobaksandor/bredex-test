package com.bredex.f1teams.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;


@RestControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {

		final var errors = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach(error -> {

			final var fieldName = ((FieldError) error).getField();
			final var errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(errors);
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<?> handleArgumentExceptions(MethodArgumentTypeMismatchException ex) {

		final var message = "The method arguments are not valid: " + ex.getLocalizedMessage();

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(message);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {

		final var message = "Unique or not null database constraint violated.";

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(message);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<String> handleDataIntegrityViolationException(IllegalArgumentException ex) {

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(ex.getMessage());
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<String> entityNotFoundException(EntityNotFoundException ex) {

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(ex.getMessage());
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<String> accessDeniedException(AccessDeniedException ex) {

		final var message = "You are not authenticated.";

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(message);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleGeneralException(Exception ex) {

		final var message = "An unexpected error occurred.";

		ex.printStackTrace();

		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(message);
	}
}