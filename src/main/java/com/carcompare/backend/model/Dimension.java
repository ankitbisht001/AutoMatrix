package com.carcompare.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dimension {

    @Id
    private Long carId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "car_id", foreignKey = @ForeignKey(name = "fk_dimension_car", foreignKeyDefinition = "FOREIGN KEY (car_id) REFERENCES car(car_id) ON DELETE CASCADE"))
    @JsonBackReference
    private Car car;

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
