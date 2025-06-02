package com.carcompare.backend.DTO;

import com.carcompare.backend.model.Review;
import lombok.Data;

@Data
public class ReviewResponse {
    private Long reviewId;
    private String reviewText;
    private int rating;
    private String timestamp;
    private String userName;

    public ReviewResponse(Review review) {
        this.reviewId = review.getReviewId();
        this.reviewText = review.getReviewText();
        this.rating = review.getRating();
        this.timestamp = review.getTimestamp().toString();
        this.userName = review.getUser().getName(); // manually extract name
    }
}
