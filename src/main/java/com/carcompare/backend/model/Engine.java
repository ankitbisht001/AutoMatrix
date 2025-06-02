package com.carcompare.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Engine {

    @Id
    private Long carId;

    @OneToOne
    @MapsId
    @JoinColumn(
            name = "car_id",
            foreignKey = @ForeignKey(name = "fk_engine_car", foreignKeyDefinition = "FOREIGN KEY (car_id) REFERENCES car(car_id) ON DELETE CASCADE")
    )
    @JsonBackReference
    private Car car;

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
