package com.bredex.f1teams.model.entity;

import com.bredex.f1teams.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_user")
public class User implements UserDetails {

	@Id
	@GeneratedValue
	@NotNull
	private Long id;

	@NotBlank
	@Size(min = 1, max = 255, message = "must be between 1 and 255 characters.")
	@Pattern(regexp = "^[\\p{L} -]+$", message = "can only contain letters, spaces, and hyphens")
	private String firstName;

	@NotBlank
	@Size(min = 1, max = 255, message = "must be between 1 and 255 characters.")
	@Pattern(regexp = "^[\\p{L} -]+$", message = "can only contain letters, spaces, and hyphens")
	private String lastName;

	@NotBlank
	@Pattern(regexp = "^[\\p{L}0-9]{4,16}$", message = "must consist of 4 to 16 alphanumeric characters")
	private String username;

	@NotBlank
	@Email
	private String email;

	@JsonIgnore
	@NotBlank
	private String password;

	@JsonIgnore
	@Enumerated(EnumType.STRING)
	@NotNull
	private Role role;

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


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}