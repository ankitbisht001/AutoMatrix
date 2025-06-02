package com.carcompare.backend.repository;

import com.carcompare.backend.model.Dimension;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DimensionRepository extends JpaRepository<Dimension, Long> {
    Optional<Dimension> findByCar_CarId(Long carId);

}
