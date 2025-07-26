package com.microgreens.repository;

import com.microgreens.model.Order;
import com.microgreens.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findTop10ByOrderByOrderTimeDesc();

    List<Order> findByUser(User user);
}