package com.carcompare.backend.service;

import com.carcompare.backend.model.Car;
import com.carcompare.backend.model.Comparison;
import com.carcompare.backend.model.User;
import com.carcompare.backend.repository.CarRepository;
import com.carcompare.backend.repository.ComparisonRepository;
import com.carcompare.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComparisonService {

    private final ComparisonRepository comparisonRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    // Method to save a comparison
    public Comparison saveComparison(Long carId1, Long carId2) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Car car1 = carRepository.findById(carId1).orElseThrow();
        Car car2 = carRepository.findById(carId2).orElseThrow();

        Comparison comparison = Comparison.builder()
                .user(user)
                .car1(car1)
                .car2(car2)
                .build();

        return comparisonRepository.save(comparison);
    }

    // Method to get all comparisons for a specific user
    public List<Comparison> getComparisonsForUser(String email) {
        // Fetch the user by email (or could use user from security context if necessary)
        User user = userRepository.findByEmail(email).orElseThrow();


        return comparisonRepository.findByUser(user);

    }
}
