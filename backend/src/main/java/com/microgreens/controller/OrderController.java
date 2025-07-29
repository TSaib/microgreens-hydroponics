package com.microgreens.controller;

import com.microgreens.model.*;
import com.microgreens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired private OrderRepository orderRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
 

    @PostMapping
    public Map<String, Object> placeOrder(@RequestBody Map<String,Object> req) {
        // For general users, do not require authentication
        List<Map<String,Object>> itemsReq = (List<Map<String,Object>>) req.get("items");
        List<OrderItem> orderItems = new ArrayList<>();
        for (Map<String,Object> item : itemsReq) {
            Long productId = ((Number)item.get("productId")).longValue();
            int qty = (int)item.get("quantity");
            Product p = productRepo.findById(productId).orElseThrow();
            OrderItem oi = new OrderItem();
            oi.setProduct(p);
            oi.setQuantity(qty);
            orderItems.add(oi);
        }
        Order order = new Order();
        // No user association for unauthenticated orders
        order.setOrderTime(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setItems(orderItems);
        orderRepo.save(order);

        return Map.of("success", true, "orderId", order.getOrderId());
    }

    @GetMapping
    public List<Order> getOrders(@RequestParam String email, @RequestParam String password) {
        // Basic username/password validation for order access
        User user = userRepo.findByEmail(email).orElse(null);
        //if (user != null && user.getPassword().equals(password)) {
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            // Check user role to determine order visibility
            if (user.getRole().equals("ADMIN")) {
                return orderRepo.findAll(); // admin sees all orders
            } else {
                return orderRepo.findByUser(user); // user sees their own orders
            }
        }
        // Invalid credentials or user not found
        return Collections.emptyList();
    }
}