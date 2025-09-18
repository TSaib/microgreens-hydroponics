package com.microgreens.controller;

import com.microgreens.model.*;
import com.microgreens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired private OrderRepository orderRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    //@Autowired private PasswordEncoder passwordEncoder;


    // @PostMapping
    // public Map<String, Object> placeOrder(@RequestBody Map<String,Object> req) {
    //     // For general users, do not require authentication
    //     List<Map<String,Object>> itemsReq = (List<Map<String,Object>>) req.get("items");
    //     List<OrderItem> orderItems = new ArrayList<>();
    //     java.math.BigDecimal total = java.math.BigDecimal.ZERO;
    //     for (Map<String,Object> item : itemsReq) {
    //         Long productId = ((Number)item.get("productId")).longValue();
    //         int qty = (int)item.get("quantity");
    //         Product p = productRepo.findById(productId).orElseThrow();
    //         OrderItem oi = new OrderItem();
    //         oi.setProduct(p);
    //         oi.setQuantity(qty);
    //         orderItems.add(oi);
    //         total = total.add(p.getPrice().multiply(java.math.BigDecimal.valueOf(qty)));
    //     }
    //     Order order = new Order();
    //     // No user association for unauthenticated orders
    //     order.setOrderTime(LocalDateTime.now());
    //     order.setStatus("PLACED");
    //     order.setItems(orderItems);
    //     order.setTotal(total);
    //     // Set the parent order reference in each OrderItem
    //     for (OrderItem oi : orderItems) {
    //         oi.setOrder(order);
    //     }
    //     orderRepo.save(order);
    //     return Map.of("success", true, "orderId", order.getOrderId(), "total", total);
    // }

    @GetMapping
    public List<Order> getOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("[OrderController] Authentication: " + authentication);
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return Collections.emptyList();
        }
        String email = authentication.getName();
        User user = userRepo.findByEmail(email).orElse(null);
        System.out.println("[OrderController] User: " + user);

        if (user == null) {
            System.out.println("[OrderController] Inside user==null: " + user);
            return Collections.emptyList();
        }
        if (user.getRole().equals("ADMIN")) {
            List<Order> allOrders = orderRepo.findAll();
            System.out.println("[OrderController] ADMIN - Returning all orders. Count: " + allOrders.size());
            return allOrders;
        } else {
            System.out.println("[OrderController] Fetching orders for user_id: " + user.getUserId());
            List<Order> userOrders = orderRepo.findByUserId(user.getUserId());
            System.out.println("[OrderController] Orders found for user_id " + user.getUserId() + ": " + userOrders.size());
            return userOrders;
        }
    }
}