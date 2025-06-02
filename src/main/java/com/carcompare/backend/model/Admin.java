package com.carcompare.backend.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long adminId;

    @Getter
    @Column(nullable = false, unique = true)
    private String username;

    @Getter
    @Column(nullable = false)
    private String password;


}