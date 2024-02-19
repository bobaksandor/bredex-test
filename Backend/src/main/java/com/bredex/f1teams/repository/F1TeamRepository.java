package com.bredex.f1teams.repository;

import com.bredex.f1teams.model.entity.F1Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface F1TeamRepository extends JpaRepository<F1Team, Long> {

	Optional<F1Team> findByName(String name);
}
