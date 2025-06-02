package com.carcompare.backend.controller;

import com.carcompare.backend.config.JwtUtil;
import com.carcompare.backend.model.Admin;
import com.carcompare.backend.repository.AdminRepository;
import com.carcompare.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        boolean isValid = adminService.verifyLogin(username, password);

        if (!isValid) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid admin credentials"));
        }

        Admin admin = adminRepository.findByUsername(username).orElse(null);

        if (admin == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Admin not found"));
        }

        String token = jwtUtil.generateToken(admin.getUsername(), admin.getAdminId(), "ROLE_ADMIN");

        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/current")
    public ResponseEntity<Map<String, String>> getCurrentAdmin() {
        String username = adminService.getLoggedInAdminUsername();
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        return ResponseEntity.ok(Map.of("username", username));
    }
}
