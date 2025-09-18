package com.microgreens.repository;

import com.microgreens.model.Order;
import com.microgreens.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findTop10ByOrderByOrderTimeDesc();

    @Query(value = "SELECT * FROM orders WHERE user_user_id = :userId", nativeQuery = true)
    List<Order> findByUserId(@Param("userId") Long userId);
}