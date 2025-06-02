package com.carcompare.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comparison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comparisonId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties({"comparisons"})
    @JoinColumn(name = "car_id_1", nullable = false)
    private Car car1;

    @ManyToOne
    @JsonIgnoreProperties({"comparisons"})
    @JoinColumn(name = "car_id_2", nullable = false)
    private Car car2;
}