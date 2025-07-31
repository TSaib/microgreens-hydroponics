package com.microgreens.controller;

import com.microgreens.model.CartItem;
import com.microgreens.model.Product;
import com.microgreens.model.User;
import com.microgreens.repository.CartItemRepository;
import com.microgreens.repository.ProductRepository;
import com.microgreens.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    @Autowired private CartItemRepository cartRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;

    @GetMapping
    public List<CartItem> getCart(@RequestParam String email) {
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) return List.of();
        return cartRepo.findByUser(user);
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestParam String email, @RequestParam Long productId, @RequestParam int quantity) {
        User user = userRepo.findByEmail(email).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();
        CartItem existing = cartRepo.findByUserAndProduct(user, product);
        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantity);
            return cartRepo.save(existing);
        }
        CartItem item = new CartItem();
        item.setUser(user);
        item.setProduct(product);
        item.setQuantity(quantity);
        return cartRepo.save(item);
    }

    @PutMapping("/update")
    public CartItem updateCart(@RequestParam String email, @RequestParam Long productId, @RequestParam int quantity) {
        User user = userRepo.findByEmail(email).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();
        CartItem item = cartRepo.findByUserAndProduct(user, product);
        if (item != null) {
            item.setQuantity(quantity);
            return cartRepo.save(item);
        }
        throw new RuntimeException("Cart item not found");
    }

    @DeleteMapping("/remove")
    public String removeFromCart(@RequestParam String email, @RequestParam Long productId) {
        User user = userRepo.findByEmail(email).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();
        CartItem item = cartRepo.findByUserAndProduct(user, product);
        if (item != null) {
            cartRepo.delete(item);
            return "Item removed from cart";
        }
        return "Item not found in cart";
    }

    @DeleteMapping("/clear")
    public String clearCart(@RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        List<CartItem> items = cartRepo.findByUser(user);
        cartRepo.deleteAll(items);
        return "Cart cleared";
    }
}
