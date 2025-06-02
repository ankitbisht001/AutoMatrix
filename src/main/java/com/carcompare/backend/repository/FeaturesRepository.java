package com.carcompare.backend.repository;

import com.carcompare.backend.model.Features;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeaturesRepository extends JpaRepository<Features, Long> {
    Optional<Features> findByCar_CarId(Long carId);

}
