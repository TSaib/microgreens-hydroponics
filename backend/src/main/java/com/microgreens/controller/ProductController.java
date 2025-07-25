package com.microgreens.controller;

import com.microgreens.model.Product;
import com.microgreens.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // <-- Make sure this matches your frontend URL!
public class ProductController {
    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> all(@RequestParam(required = false) String category) {
        if (category != null) {
            return repo.findByCategory(category);
        }
        return repo.findAll();
    }
}