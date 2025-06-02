package com.carcompare.backend.controller;

import com.carcompare.backend.model.User;
import com.carcompare.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final com.carcompare.backend.service.AuthService authService;
    private final UserRepository userRepository; // ✅ Injecting the repository directly

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");

        String token = authService.register(name, email, password);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        String token = authService.login(email, password);
        return ResponseEntity.ok(Map.of("token", token));
    }

    // ✅ Endpoint to get logged-in user's name
    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This returns email (which is used to login)

        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null) {
            return ResponseEntity.ok(Map.of("username", user.getName()));
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }
}
