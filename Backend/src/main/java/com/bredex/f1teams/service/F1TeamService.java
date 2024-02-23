package com.bredex.f1teams.service;

import com.bredex.f1teams.model.entity.F1Team;
import com.bredex.f1teams.model.request.F1TeamRequest;
import com.bredex.f1teams.repository.F1TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class F1TeamService {

	private final F1TeamRepository f1TeamRepository;

	public List<F1Team> getF1Teams(Integer start, String sortBy, String sortOrder) {

		final var pageSize = 10;

		if (start < 0) {

			throw new IllegalArgumentException("Invalid start parameter.");
		}

		if (!Arrays.asList("name", "foundingYear", "championshipsWon", "hasPayed").contains(sortBy)) {

			throw new IllegalArgumentException("Invalid sortBy parameter.");
		}

		if (!Arrays.asList("asc", "desc").contains(sortOrder)) {

			throw new IllegalArgumentException("Invalid sortOrder parameter.");
		}

		final var direction = sortOrder.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

		final var pageRequest = PageRequest.of(start / pageSize, pageSize, Sort.by(direction, sortBy));

		final var f1TeamPage = f1TeamRepository.findAll(pageRequest);

		return f1TeamPage.getContent();
	}

	public F1Team save(F1TeamRequest request) {

		if (f1TeamRepository.findByName(request.getName()).isPresent()) {

			final var message = "An F1 team with name \"" + request.getName() + "\" already exists.";

			throw new DataIntegrityViolationException(message);
		}

		return f1TeamRepository.save(
				F1Team.builder()
						.name(request.getName())
						.foundingYear(request.getFoundingYear())
						.championshipsWon(request.getChampionshipsWon())
						.hasPayed(request.getHasPayed())
						.createdAt(new Date(System.currentTimeMillis()))
						.updatedAt(new Date(System.currentTimeMillis()))
						.build()
		);
	}

	public F1Team update(Long id, F1TeamRequest request) {

		return f1TeamRepository.findById(id)
				.map(team -> {

					team.setName(request.getName());
					team.setFoundingYear(request.getFoundingYear());
					team.setChampionshipsWon(request.getChampionshipsWon());
					team.setHasPayed(request.getHasPayed());
					team.setUpdatedAt(new Date(System.currentTimeMillis()));

					return f1TeamRepository.save(team);

				})
				.orElseThrow(() -> new EntityNotFoundException("No team was found with the given id (" + id + ")."));

	}
}