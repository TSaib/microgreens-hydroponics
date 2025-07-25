package com.microgreens.model;

import jakarta.persistence.*;

@Entity
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    private int quantity;

    // Getters and setters...
}