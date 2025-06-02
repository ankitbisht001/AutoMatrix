package com.carcompare.backend.controller;

import com.carcompare.backend.model.Comparison;
import com.carcompare.backend.service.ComparisonService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comparisons")
@RequiredArgsConstructor
public class ComparisonController {

    private final ComparisonService comparisonService;

    // Save comparison
    @PostMapping("/save")
    public ResponseEntity<Comparison> saveComparison(@RequestBody SaveComparisonRequest request) {
        Comparison saved = comparisonService.saveComparison(request.getCarId1(), request.getCarId2());
        return ResponseEntity.ok(saved);
    }

    // Get saved comparisons for the authenticated user
    @GetMapping
    public ResponseEntity<List<Comparison>> getSavedComparisons(@AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails) {
        String username = userDetails.getUsername();
        List<Comparison> comparisons = comparisonService.getComparisonsForUser(username);
        return ResponseEntity.ok(comparisons);
    }

    // Inner class for request body to save comparison
    @Getter
    @Setter
    public static class SaveComparisonRequest {
        private Long carId1;
        private Long carId2;
    }
}
