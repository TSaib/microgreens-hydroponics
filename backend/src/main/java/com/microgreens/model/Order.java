package com.microgreens.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private LocalDateTime orderTime;

    private String status; // "PLACED", "PROCESSING", "DELIVERED", etc.

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;

    // Getters and setters...
}