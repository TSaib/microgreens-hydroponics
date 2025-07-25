package com.microgreens.controller;

import com.microgreens.model.Order;
import com.microgreens.model.User;
import com.microgreens.repository.OrderRepository;
import com.microgreens.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/analytics")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminAnalyticsController {
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public AdminAnalyticsController(OrderRepository orderRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/sales")
    public BigDecimal getTotalSales() {
        List<Order> orders = orderRepo.findAll();
        return orders.stream()
            .flatMap(o -> o.getItems().stream())
            .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @GetMapping("/orders/count")
    public long getOrdersCount() {
        return orderRepo.count();
    }

    @GetMapping("/users/count")
    public long getUsersCount() {
        return userRepo.count();
    }

    @GetMapping("/recent-orders")
    public List<Order> getRecentOrders() {
        return orderRepo.findTop10ByOrderByOrderTimeDesc();
    }

    @GetMapping("/top-customers")
    public List<User> getTopCustomers() {
        // Example: Users with most orders
        return userRepo.findTop5ByOrderByOrdersDesc();
    }
}