package com.bredex.f1teams.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

	@NotBlank
	@Pattern(regexp = "^[\\p{L}0-9_-]{4,16}$", message = "Username must consist of 4 to 16 alphanumeric characters, underscores, or hyphens")
	private String username;

	@NotBlank
	@Email
	private String email;

	@Size(min = 7, max = 150, message = "Password length must be between 7 and 150 characters")
	@Pattern(
			regexp = "^(?=.*[a-z])(?=.*\\d).+$",
			message = "Password must contain at least one lowercase letter and one number"
	)
	private String password;


	@NotBlank
	@Size(min = 1, max = 255, message = "must be between 1 and 255 characters.")
	@Pattern(regexp = "^[\\p{L} -]+$", message = "First name can only contain letters, spaces, and hyphens")
	private String firstName;

	@NotBlank
	@Size(min = 1, max = 255, message = "must be between 1 and 255 characters.")
	@Pattern(regexp = "^[\\p{L} -]+$", message = "Last name can only contain letters, spaces, and hyphens")
	private String lastName;
}