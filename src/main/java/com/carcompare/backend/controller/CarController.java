package com.carcompare.backend.controller;

import com.carcompare.backend.DTO.AddCarRequest;
import com.carcompare.backend.DTO.UpdateCarRequest;
import com.carcompare.backend.exception.ResourceNotFoundException;
import com.carcompare.backend.model.Car;
import com.carcompare.backend.repository.CarRepository;
import com.carcompare.backend.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class CarController {

    private final CarService carService;
    private final CarRepository carRepository;

    @Autowired
    public CarController(CarService carService, CarRepository carRepository) {
        this.carService = carService;
        this.carRepository = carRepository;
    }

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carService.getCarById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + id));
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCar(@RequestBody AddCarRequest request) {
        carService.addCar(request);
        return ResponseEntity.ok("Car added successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car updatedCar) {
        Car existingCar = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + id));

        existingCar.setCarName(updatedCar.getCarName());
        existingCar.setBrandName(updatedCar.getBrandName());
        existingCar.setModel(updatedCar.getModel());
        existingCar.setPriceExShowroom(updatedCar.getPriceExShowroom());
        existingCar.setBookingLink(updatedCar.getBookingLink());
        existingCar.setImage(updatedCar.getImage());
        existingCar.setEngine(updatedCar.getEngine());
        existingCar.setDimension(updatedCar.getDimension());
        existingCar.setFeatures(updatedCar.getFeatures());

        Car savedCar = carRepository.save(existingCar);
        return ResponseEntity.ok(savedCar);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCar(@RequestBody    UpdateCarRequest request) {
        carService.updateCar(request);
        return ResponseEntity.ok("Car updated successfully");
    }


}

