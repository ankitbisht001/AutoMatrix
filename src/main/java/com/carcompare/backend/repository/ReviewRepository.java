package com.carcompare.backend.repository;

import com.carcompare.backend.model.Review;
import com.carcompare.backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByCar(Car car);
}
