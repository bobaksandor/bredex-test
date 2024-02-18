package com.bredex.f1teams.exception;

public class UserAlreadyExists extends RuntimeException {

	public UserAlreadyExists(String message) {
		super(message);
	}
}
