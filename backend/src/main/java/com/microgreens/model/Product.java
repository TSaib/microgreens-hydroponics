package com.microgreens.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price; // INR
    private String category; // "microgreens" or "hydroponics"

    // Getters and setters...
}