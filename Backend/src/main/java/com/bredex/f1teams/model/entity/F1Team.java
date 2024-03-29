package com.bredex.f1teams.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class F1Team {

	@Id
	@GeneratedValue
	@NotNull
	private Long id;

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

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern = "yyyy-MM-dd  HH:mm:ss", timezone = "Europe/Budapest")
	@PastOrPresent
	@NotNull
	private Date createdAt;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern = "yyyy-MM-dd  HH:mm:ss", timezone = "Europe/Budapest")
	@PastOrPresent
	@NotNull
	private Date updatedAt;
}
