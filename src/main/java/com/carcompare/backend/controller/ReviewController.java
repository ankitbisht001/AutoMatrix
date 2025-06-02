package com.carcompare.backend.controller;
import com.carcompare.backend.DTO.ReviewResponse;
import com.carcompare.backend.DTO.ReviewRequest;
import com.carcompare.backend.model.Review;
import com.carcompare.backend.service.ReviewService;
import com.carcompare.backend.config.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtUtil jwtUtil;

    // 🔽 1. Get all reviews for a car
    @GetMapping("/{carId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsForCar(@PathVariable Long carId) {
        List<Review> reviews = reviewService.getReviewsByCarId(carId);
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(ReviewResponse::new)
                .toList();
        return ResponseEntity.ok(reviewResponses);
    }

    // 🔽 2. Post a new review
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody ReviewRequest request, HttpServletRequest servletRequest) {
        try {
            String authHeader = servletRequest.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).build(); // Unauthorized
            }

            String token = authHeader.substring(7); // Remove "Bearer "
            Long userId = jwtUtil.extractUserId(token);

            Review savedReview = reviewService.saveReview(
                    userId,
                    request.getCarId(),
                    request.getReviewText(),
                    request.getRating()
            );

            return ResponseEntity.ok(savedReview);

        } catch (Exception e) {
            return ResponseEntity.status(400).build(); // Bad request or token issue
        }
    }
}
