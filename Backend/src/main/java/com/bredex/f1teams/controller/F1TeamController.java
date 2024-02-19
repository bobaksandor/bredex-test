package com.bredex.f1teams.controller;

import com.bredex.f1teams.model.entity.F1Team;
import com.bredex.f1teams.model.request.F1TeamRequest;
import com.bredex.f1teams.repository.F1TeamRepository;
import com.bredex.f1teams.service.F1TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/f1-teams")
@RequiredArgsConstructor
public class F1TeamController {

	private final F1TeamService f1TeamService;
	private final F1TeamRepository f1TeamRepository;

	@GetMapping
	public ResponseEntity<?> getF1Teams(
			@RequestParam(required = false, defaultValue = "0") final Integer start,
			@RequestParam(required = false, defaultValue = "name") final String sortBy,
			@RequestParam(required = false, defaultValue = "asc") final String sortOrder
	) {

		List<F1Team> f1Teams = f1TeamService.getF1Teams(start, sortBy, sortOrder);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(f1Teams);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable final Long id) {

		final var team = f1TeamRepository
				.findById(id);

		if (team.isPresent()) {

			return ResponseEntity
					.status(HttpStatus.OK)
					.body(team.get());
		}

		final var message = "No team was found with the given id (" + id + ").";

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(message);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping
	public ResponseEntity<?> createTeam(@Valid @RequestBody final F1TeamRequest request) {

		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(f1TeamService.save(request));

	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTeam(@PathVariable final Long id) {

		if (
				f1TeamRepository
						.findById(id)
						.isPresent()
		) {

			f1TeamRepository.deleteById(id);

			return ResponseEntity
					.status(HttpStatus.NO_CONTENT)
					.build();
		}

		final var message = "No team was found with the given id (" + id + ").";

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(message);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<?> updateTeam(
			@PathVariable final Long id,
			@Valid @RequestBody final F1TeamRequest request
	) {

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(f1TeamService.update(id, request));
	}

}

