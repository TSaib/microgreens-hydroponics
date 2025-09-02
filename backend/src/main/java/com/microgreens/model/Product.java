package com.microgreens.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Product {
    @ElementCollection
    @CollectionTable(name = "product_nutrients", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "nutrients")
    private List<String> nutrients;

    public List<String> getNutrients() {
        return nutrients;
    }
    public void setNutrients(List<String> nutrients) {
        this.nutrients = nutrients;
    }
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price; // INR
    private String category; // "microgreens" or "hydroponics" or "homefoods"
    @Column(name = "container_quantity")
    private String containerQuantity; // e.g. "100g", "250ml", "1kg"

    public String getContainerQuantity() {
        return containerQuantity;
    }
    public void setContainerQuantity(String containerQuantity) {
        this.containerQuantity = containerQuantity;
    }

    // Getters and setters...
    public Long getProductId() {
        return product_id;
    }
    public void setProductId(Long product_id) {
        this.product_id = product_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "product_id=" + product_id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", containerQuantity='" + containerQuantity + '\'' +
                '}';
    }


}