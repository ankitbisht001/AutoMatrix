package com.carcompare.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class PasswordHashTest {

    @Test
    void generatePasswordHash() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "beast@12";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("BCrypt hash: " + encodedPassword);
    }
}
