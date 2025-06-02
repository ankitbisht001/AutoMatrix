package com.carcompare.backend.service;

import com.carcompare.backend.model.User;
import com.carcompare.backend.repository.UserRepository;
import com.carcompare.backend.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Register a new user
    public String register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password)) // encode password
                .build();

        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail(), user.getUserId());//return token
    }

    // Authenticate and login
    public String login(String email, String rawPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getUserId()); //return token
    }
}
