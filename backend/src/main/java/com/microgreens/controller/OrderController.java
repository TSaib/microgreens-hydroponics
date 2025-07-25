package com.microgreens.controller;

import com.microgreens.model.*;
import com.microgreens.repository.*;
import com.microgreens.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired private OrderRepository orderRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping
    public Map<String, Object> placeOrder(@RequestBody Map<String,Object> req, @RequestHeader("Authorization") String auth) {
        String token = auth.replace("Bearer ", "");
        String email = jwtUtil.getEmail(token);

        User user = userRepo.findByEmail(email).orElseThrow();
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
        order.setUser(user);
        order.setOrderTime(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setItems(orderItems);
        orderRepo.save(order);

        return Map.of("success", true, "orderId", order.getId());
    }

    @GetMapping
    public List<Order> getOrders(@RequestHeader("Authorization") String auth) {
        String token = auth.replace("Bearer ", "");
        String email = jwtUtil.getEmail(token);
        String role = jwtUtil.getRole(token);
        if (role.equals("ADMIN")) {
            return orderRepo.findAll();
        } else {
            User user = userRepo.findByEmail(email).orElseThrow();
            return orderRepo.findByUser(user);
        }
    }
}