package com.carcompare.backend.service;

import com.carcompare.backend.model.Admin;
import com.carcompare.backend.repository.AdminRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import java.util.Optional;
@Getter
@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean verifyLogin(String username, String rawPassword) {
        Optional<Admin> optionalAdmin = adminRepository.findByUsername(username);
        return optionalAdmin.isPresent() &&
                passwordEncoder.matches(rawPassword, optionalAdmin.get().getPassword());
    }

    public String getLoggedInAdminUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // this gives you the logged-in admin's username from JWT
    }


}
