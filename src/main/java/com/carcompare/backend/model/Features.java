package com.carcompare.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Features {

    @Id
    private Long carId;

    @OneToOne
    @MapsId
    @JoinColumn(
            name = "car_id",
            foreignKey = @ForeignKey(name = "fk_features_car", foreignKeyDefinition = "FOREIGN KEY (car_id) REFERENCES car(car_id) ON DELETE CASCADE")
    )
    @JsonBackReference
    private Car car;

    private String abs;                   // Anti-lock Braking System
    private String tractionControl;
    private String hillHoldAssist;
    private String camera360;
    private String sunroof;
    private String fogLights;
    private String ventilatedSeats;
    private String airbags;
    private String  gncapRating;

    // ✅ Optional but recommended additions for completeness:
    private String parkingSensors;
    private String electronicStabilityControl;
}
