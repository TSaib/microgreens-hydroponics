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
    @Autowired
    private com.microgreens.repository.OrderRepository orderRepo;
    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
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

    @PostMapping("/checkout")
    public Object checkout(@RequestParam String email, @RequestParam String address) {
        User user = userRepo.findByEmail(email).orElseThrow();
        List<CartItem> cartItems = cartRepo.findByUser(user);
        if (cartItems.isEmpty()) return "Cart is empty";
        java.math.BigDecimal total = java.math.BigDecimal.ZERO;
        List<com.microgreens.model.OrderItem> orderItems = new java.util.ArrayList<>();
        for (CartItem ci : cartItems) {
            com.microgreens.model.OrderItem oi = new com.microgreens.model.OrderItem();
            oi.setProduct(ci.getProduct());
            oi.setQuantity(ci.getQuantity());
            orderItems.add(oi);
            total = total.add(ci.getProduct().getPrice().multiply(java.math.BigDecimal.valueOf(ci.getQuantity())));
        }
        com.microgreens.model.Order order = new com.microgreens.model.Order();
        order.setUser(user);
        order.setOrderTime(java.time.LocalDateTime.now());
        order.setStatus("PLACED");
        order.setItems(orderItems);
        order.setTotal(total);
        order.setAddress(address);
        for (com.microgreens.model.OrderItem oi : orderItems) {
            oi.setOrder(order);
        }
        orderRepo.save(order);
        cartRepo.deleteAll(cartItems);
        return java.util.Map.of("success", true, "orderId", order.getOrderId(), "total Rs", total);
    }

}
