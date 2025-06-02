package com.carcompare.backend.service;

import com.carcompare.backend.DTO.AddCarRequest;
import com.carcompare.backend.DTO.UpdateCarRequest;
import com.carcompare.backend.model.Car;
import com.carcompare.backend.model.Dimension;
import com.carcompare.backend.model.Engine;
import com.carcompare.backend.model.Features;
import com.carcompare.backend.repository.CarRepository;
import com.carcompare.backend.repository.DimensionRepository;
import com.carcompare.backend.repository.EngineRepository;
import com.carcompare.backend.repository.FeaturesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Base64;
import java.util.List;
import java.util.Optional;
@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private EngineRepository engineRepository;

    @Autowired
    private DimensionRepository dimensionRepository;

    @Autowired
    private FeaturesRepository featuresRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public void addCar(AddCarRequest req) {
        Car car = new Car();
        car.setCarName(req.getCarName());
        car.setBrandName(req.getBrandName());
        car.setModel(req.getModel());
        car.setPriceExShowroom(req.getPriceExShowroom());
        car.setBookingLink(req.getBookingLink());
        if (req.getImage() != null && !req.getImage().isEmpty()) {
            String base64Image = req.getImage().split(",")[1]; // remove "data:image/png;base64,"
            byte[] decodedImage = Base64.getDecoder().decode(base64Image);
            car.setImage(decodedImage);
        }

        carRepository.save(car);

        AddCarRequest.EngineDTO e = req.getEngine();
        Engine engine = new Engine();
        engine.setCar(car);
        engine.setEngineDisplacement(e.getEngineDisplacement());
        engine.setCylinderConfiguration(e.getCylinderConfiguration());
        engine.setValveTrain(e.getValveTrain());
        engine.setEngineType(e.getEngineType());
        engine.setFuelType(e.getFuelType());
        engine.setMaxPower(e.getMaxPower());
        engine.setMaxTorque(e.getMaxTorque());
        engine.setMileageArai(e.getMileageArai());
        engine.setTransmissionType(e.getTransmissionType());
        engine.setDrivetrain(e.getDrivetrain());
        engine.setEmissionStandard(e.getEmissionStandard());
        engine.setIdleStartStop(e.getIdleStartStop());
        engineRepository.save(engine);

        AddCarRequest.DimensionDTO d = req.getDimension();
        Dimension dimension = new Dimension();
        dimension.setCar(car);
        dimension.setLength(d.getLength());
        dimension.setWidth(d.getWidth());
        dimension.setHeight(d.getHeight());
        dimension.setWheelbase(d.getWheelbase());
        dimension.setSeatingCapacity(d.getSeatingCapacity());
        dimension.setGroundClearance(d.getGroundClearance());
        dimension.setWeight(d.getWeight());
        dimension.setBootSpace(d.getBootSpace());
        dimension.setFuelTankCapacity(d.getFuelTankCapacity());
        dimension.setTyreSize(d.getTyreSize());

        dimensionRepository.save(dimension);

        AddCarRequest.FeaturesDTO f = req.getFeatures();
        Features features = new Features();
        features.setCar(car);
        features.setAbs(f.getAbs()) ;
        features.setTractionControl(f.getTractionControl()) ;
        features.setHillHoldAssist(f.getHillHoldAssist()) ;
        features.setCamera360(f.getCamera360());
        features.setSunroof(f.getSunroof());
        features.setFogLights(f.getFogLights());
        features.setVentilatedSeats(f.getVentilatedSeats());
        features.setParkingSensors(f.getParkingSensors());
        features.setElectronicStabilityControl(f.getElectronicStabilityControl());
        features.setAirbags(f.getAirbags());
        features.setGncapRating(f.getGncapRating());

        featuresRepository.save(features);
    }
    public void updateCar(UpdateCarRequest req) {
        Optional<Car> carOpt = carRepository.findById(req.getCarId());
        if (carOpt.isEmpty()) {
            throw new RuntimeException("Car not found with ID: " + req.getCarId());
        }

        Car car = carOpt.get();
        car.setBrandName(req.getBrandName());
        car.setModel(req.getModel());
        car.setPriceExShowroom(req.getPriceExShowroom());
        car.setBookingLink(req.getBookingLink());
        if (req.getImage() != null && req.getImage().contains(",")) {
            String[] parts = req.getImage().split(",");
            if (parts.length > 1 && !parts[1].isEmpty()) {
                byte[] decodedImage = Base64.getDecoder().decode(parts[1]);
                car.setImage(decodedImage);
            }
        }
        carRepository.save(car);

        // Update Engine
        Engine engine = engineRepository.findByCar_CarId(req.getCarId())
                .orElse(new Engine());
        engine.setCar(car);
        engine.setEngineDisplacement(req.getEngineDisplacement());
        engine.setCylinderConfiguration(req.getCylinderConfiguration());
        engine.setValveTrain(req.getValveTrain());
        engine.setEngineType(req.getEngineType());
        engine.setFuelType(req.getFuelType());
        engine.setMaxPower(req.getMaxPower());
        engine.setMaxTorque(req.getMaxTorque());
        engine.setMileageArai(req.getMileageArai());
        engine.setTransmissionType(req.getTransmissionType());
        engine.setDrivetrain(req.getDrivetrain());
        engine.setEmissionStandard(req.getEmissionStandard());
        engine.setIdleStartStop(req.getIdleStartStop());
        engineRepository.save(engine);

        // Update Dimension
        Dimension dimension = dimensionRepository.findByCar_CarId(req.getCarId())
                .orElse(new Dimension());
        dimension.setCar(car);
        dimension.setLength(req.getLength());
        dimension.setWidth(req.getWidth());
        dimension.setHeight(req.getHeight());
        dimension.setWheelbase(req.getWheelbase());
        dimension.setGroundClearance(req.getGroundClearance());
        dimension.setBootSpace(req.getBootSpace());
        dimension.setFuelTankCapacity(req.getFuelTankCapacity());
        dimension.setSeatingCapacity(req.getSeatingCapacity());
        dimension.setTyreSize(req.getTyreSize());
        dimension.setWeight(req.getWeight());
        dimensionRepository.save(dimension);

        // Update Features
        Features features = featuresRepository.findByCar_CarId(req.getCarId())
                .orElse(new Features());
        features.setCar(car);
        features.setTractionControl(req.getTractionControl());
        features.setHillHoldAssist(req.getHillHoldAssist());
        features.setCamera360(req.getCamera360());
        features.setSunroof(req.getSunroof());
        features.setFogLights(req.getFogLights());
        features.setVentilatedSeats(req.getVentilatedSeats());
        features.setParkingSensors(req.getParkingSensors());
        features.setElectronicStabilityControl(req.getElectronicStabilityControl());
        features.setGncapRating(req.getGncapRating());
        features.setAirbags(req.getAirbags());
        featuresRepository.save(features);
    }

}
