package com.microgreens.controller;

import com.microgreens.model.Product;
import com.microgreens.model.Order;
import com.microgreens.repository.ProductRepository;
import com.microgreens.repository.OrderRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;

    public AdminController(ProductRepository productRepo, OrderRepository orderRepo) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }

    // --- Product CRUD ---

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product p) {
        return productRepo.save(p);
    }

    @PutMapping("/products/{id}")
    public Product editProduct(@PathVariable Long id, @RequestBody Product p) {
        Product prod = productRepo.findById(id).orElseThrow();
        prod.setName(p.getName());
        prod.setDescription(p.getDescription());
        prod.setImageUrl(p.getImageUrl());
        prod.setPrice(p.getPrice());
        prod.setCategory(p.getCategory());
        return productRepo.save(prod);
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepo.deleteById(id);
        return "Product with id: " + id + " deleted successfully";
    }

    // --- Orders management ---

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @PutMapping("/orders/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> status) {
        Order order = orderRepo.findById(id).orElseThrow();
        //order.setStatus(status.replace("\"", "")); // handle JSON string
        String statusValue = status.get("status");
        order.setStatus(statusValue);
        return orderRepo.save(order);
    }
}