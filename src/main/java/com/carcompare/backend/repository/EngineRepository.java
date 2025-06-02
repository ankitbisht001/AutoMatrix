package com.carcompare.backend.repository;

import com.carcompare.backend.model.Engine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EngineRepository extends JpaRepository<Engine, Long> {
    Optional<Engine> findByCar_CarId(Long carId);

}
