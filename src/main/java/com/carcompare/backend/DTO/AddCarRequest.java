package com.carcompare.backend.DTO;

import lombok.Data;
@Data
public class AddCarRequest {
    private String carName;
    private String brandName;
    private String model;
    private String priceExShowroom;
    private String bookingLink;
    private String image;


    private EngineDTO engine;
    private DimensionDTO dimension;
    private FeaturesDTO features;

    @Data
    public static class EngineDTO {
        private String engineDisplacement;
        private String cylinderConfiguration;
        private String valveTrain;
        private String engineType;
        private String fuelType;
        private String maxPower;
        private String maxTorque;
        private String mileageArai;
        private String transmissionType;
        private String drivetrain;
        private String emissionStandard;
        private String idleStartStop;
    }

    @Data
    public static class DimensionDTO {
        private String length;
        private String width;
        private String height;
        private String wheelbase;
        private String groundClearance;
        private String bootSpace;
        private String fuelTankCapacity;
        private String seatingCapacity;
        private String tyreSize;
        private String weight;

    }

    @Data
    public static class FeaturesDTO {
        private String abs;
        private String tractionControl;
        private String airbags;
        private String hillHoldAssist;
        private String gncapRating  ;
        private String camera360;
        private String sunroof;
        private String fogLights;
        private String ventilatedSeats;
        private String parkingSensors;
        private String electronicStabilityControl;
    }
}