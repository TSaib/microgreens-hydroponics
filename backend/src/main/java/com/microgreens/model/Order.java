package com.microgreens.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="orders")
public class Order {
   
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_id;

    @ManyToOne
    private User user;

    private LocalDateTime orderTime;

    private String status; // "PLACED", "PROCESSING", "DELIVERED", etc.

    @OneToMany(cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private List<OrderItem> items;

    @Column(name = "total")
    private java.math.BigDecimal total;

    // Getters and setters...
    public Long getOrderId() {
        return order_id;
    }
    public void setOrderId(Long order_id) {
        this.order_id = order_id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public LocalDateTime getOrderTime() {
        return orderTime;
    }
    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public List<OrderItem> getItems() {
        return items;
    }
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
    public java.math.BigDecimal getTotal() {
        return total;
    }
    public void setTotal(java.math.BigDecimal total) {
        this.total = total;
    }
    @Override
    public String toString() {
        return "Order{" +
                "order_id=" + order_id +
                ", user=" + (user != null ? user.getEmail() : null) +
                ", orderTime=" + orderTime +
                ", status='" + status + '\'' +
                ", total=" + (total != null ? total.toPlainString() : null) +
                ", items=" + items +
                '}';
    }
}