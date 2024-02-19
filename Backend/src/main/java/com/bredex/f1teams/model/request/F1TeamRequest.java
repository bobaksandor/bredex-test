package com.bredex.f1teams.model.request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class F1TeamRequest {

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
	private Date firstEntryYear;

	@Min(0)
	@NotNull
	private Integer championshipsWon;
}
