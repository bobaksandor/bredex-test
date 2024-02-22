package com.bredex.f1teams.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
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

	@NotBlank
	private String owner;

	@NotBlank
	private String chassis;

	@NotBlank
	private String engineSupplier;

	@NotBlank
	private String base;

	@NotNull
	@JsonFormat(pattern = "yyyy", timezone = "Europe/Budapest")
	private Date firstEntryYear;

	@Min(0)
	@NotNull
	private Integer championshipsWon;

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
