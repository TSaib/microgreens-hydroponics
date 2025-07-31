package com.microgreens.repository;

import com.microgreens.model.CartItem;
import com.microgreens.model.User;
import com.microgreens.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    CartItem findByUserAndProduct(User user, Product product);
}
