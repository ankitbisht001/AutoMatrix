package com.carcompare.backend.controller;

import com.carcompare.backend.model.Car;
import com.carcompare.backend.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/cars")
@CrossOrigin(origins = "*")
public class AdminCarController {

    private final CarService carService;

    public AdminCarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        Car savedCar = carService.saveCar(car);
        return ResponseEntity.ok(savedCar);
    }


}
