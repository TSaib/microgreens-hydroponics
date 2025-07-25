package com.microgreens.model;

import jakarta.persistence.*;

@Entity
@Table(name="users") // "user" is reserved in some DBs
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;
    private String role; // "ADMIN" or "CUSTOMER"

    // Getters and setters...
}