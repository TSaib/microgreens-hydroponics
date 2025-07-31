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
        java.math.BigDecimal total = java.math.BigDecimal.ZERO;
        for (Map<String,Object> item : itemsReq) {
            Long productId = ((Number)item.get("productId")).longValue();
            int qty = (int)item.get("quantity");
            Product p = productRepo.findById(productId).orElseThrow();
            OrderItem oi = new OrderItem();
            oi.setProduct(p);
            oi.setQuantity(qty);
            orderItems.add(oi);
            total = total.add(p.getPrice().multiply(java.math.BigDecimal.valueOf(qty)));
        }
        Order order = new Order();
        // No user association for unauthenticated orders
        order.setOrderTime(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setItems(orderItems);
        order.setTotal(total);
        // Set the parent order reference in each OrderItem
        for (OrderItem oi : orderItems) {
            oi.setOrder(order);
        }
        orderRepo.save(order);

        return Map.of("success", true, "orderId", order.getOrderId(), "total", total);
    }

    @GetMapping
    public List<Order> getOrders(@RequestParam String email, @RequestParam String password) {
        // Basic username/password validation for order access
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            System.out.println("User not found for email: " + email);
            return Collections.emptyList();
        }
        if (passwordEncoder.matches(password, user.getPassword())) {
            // Check user role to determine order visibility
            System.out.println("role from OrderController.java: " + user.getRole());
            if (user.getRole().equals("ADMIN")) {
                System.out.println("Inside ADMIN If block in OrderController.java");
                return orderRepo.findAll(); // admin sees all orders
            } else {
                System.out.println("Inside ADMIN else block in OrderController.java");
                return orderRepo.findByUser(user); // user sees their own orders
            }
        }
        // Invalid credentials
        System.out.println("Invalid password for user: " + email);
        return Collections.emptyList();
    }
}