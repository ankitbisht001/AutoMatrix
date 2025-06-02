package com.carcompare.backend.service;

import com.carcompare.backend.model.Car;
import com.carcompare.backend.model.Review;
import com.carcompare.backend.model.User;
import com.carcompare.backend.repository.CarRepository;
import com.carcompare.backend.repository.ReviewRepository;
import com.carcompare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all reviews for a car
    public List<Review> getReviewsByCarId(Long carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
        return reviewRepository.findByCar(car);
    }

    public Review saveReview(Long userId, Long carId, String reviewText, int rating) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Car car = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));

        Review review = Review.builder()
                .user(user)
                .car(car)
                .reviewText(reviewText)
                .rating(rating)
                .timestamp(LocalDateTime.now())
                .build();

        return reviewRepository.save(review);
    }
}
