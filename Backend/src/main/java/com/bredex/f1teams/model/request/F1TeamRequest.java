package com.bredex.f1teams.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class F1TeamRequest {

	@NotBlank
	private String name;

	@NotNull
	@Min(1950)
	@Max(2024)
	private Integer foundingYear;

	@Min(0)
	@NotNull
	private Integer championshipsWon;

	@NotNull
	private Boolean hasPayed;
}
