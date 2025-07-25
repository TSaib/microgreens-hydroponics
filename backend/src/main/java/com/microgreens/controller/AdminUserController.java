package com.microgreens.controller;

import com.microgreens.model.User;
import com.microgreens.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminUserController {
    private final UserRepository userRepo;

    public AdminUserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @PutMapping("/{id}/role")
    public User updateUserRole(@PathVariable Long id, @RequestBody String role) {
        User user = userRepo.findById(id).orElseThrow();
        user.setRole(role.replace("\"", ""));
        return userRepo.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }
}