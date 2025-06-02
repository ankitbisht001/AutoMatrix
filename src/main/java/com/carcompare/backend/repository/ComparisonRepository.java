package com.carcompare.backend.repository;

import com.carcompare.backend.model.Comparison;
import com.carcompare.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComparisonRepository extends JpaRepository<Comparison, Long> {

    // Custom method to find comparisons by user
    List<Comparison> findByUser(User user);
}
