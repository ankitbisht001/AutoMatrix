package com.carcompare.backend.repository;

import com.carcompare.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository provides basic CRUD operations and pagination
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom method to find a user by email
    Optional<User> findByEmail(String email);

}
