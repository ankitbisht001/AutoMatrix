package com.carcompare.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

// Lombok annotations for boilerplate code (getters, setters, constructors, etc.)
@Data // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates a constructor with all fields
@Builder // Allows building objects using builder pattern

@Entity // Marks this class as a JPA entity
@Table(name = "users") // Specifies the table name in the database
public class User {

    @Id // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long userId;

    @Email // Validates email format
    @NotBlank(message = "Email is required") // Ensures the field is not null/empty
    @Column(unique =true, nullable = false) // Unique constraint in DB
    private String email;

    @NotBlank(message = "Name is required") // Cannot be empty
    private String name;

    @NotBlank(message = "Password is required") // Cannot be empty
    private String password;
}
