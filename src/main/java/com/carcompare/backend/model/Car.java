package com.carcompare.backend.model;
import com.carcompare.backend.model.Engine;
import com.carcompare.backend.model.Dimension;
import com.carcompare.backend.model.Features;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;
    private String carName;
    private String brandName;
    private String model;
    private String priceExShowroom;
    private String bookingLink;

    @OneToOne(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Engine engine;

    @OneToOne(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Dimension dimension;

    @OneToOne(mappedBy = "car", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JsonManagedReference
    private Features features;
}
