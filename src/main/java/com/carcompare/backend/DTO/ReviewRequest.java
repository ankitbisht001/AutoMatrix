package com.carcompare.backend.DTO;

import lombok.Data;

@Data
public class ReviewRequest {
    private Long carId;
    private String reviewText;
    private int rating;
}
