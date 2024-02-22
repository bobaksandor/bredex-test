package com.bredex.f1teams;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@PostConstruct
	void started() {
		// Set Budapest time zone
		TimeZone.setDefault(TimeZone.getTimeZone("Europe/Budapest"));
	}

}
