package com.bredex.f1teams.config;

import com.bredex.f1teams.model.entity.User;
import com.bredex.f1teams.model.enums.Role;
import com.bredex.f1teams.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@RequiredArgsConstructor
public class AdminUserInitializer implements ApplicationRunner {

	private final UserRepository userRepository;

	@Override
	public void run(ApplicationArguments args) {

		final var adminUser = User.builder()
				.username("admin")
				.password("$2a$10$nS6YaXrKYyjtXlScTEEuNeQA0L6Rw5WjBc.C/i9DscTNKs22rETFG")
				.email("admin@example.com")
				.firstName("Admin")
				.lastName("User")
				.role(Role.ADMIN)
				.createdAt(new Date(System.currentTimeMillis()))
				.updatedAt(new Date(System.currentTimeMillis()))
				.build();

		userRepository.save(adminUser);
	}

}
