package com.microgreens.controller;

import com.microgreens.model.User;
import com.microgreens.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");
        if (userRepo.findByEmail(email).isPresent()) {
            return Map.of("success", false, "message", "User exists");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("CUSTOMER");
        userRepo.save(user);
        return Map.of("success", true, "role", user.getRole());
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> req) {
        Optional<User> userOpt = userRepo.findByEmail(req.get("email"));
        if (userOpt.isEmpty() || !passwordEncoder.matches(req.get("password"), userOpt.get().getPassword())) {
            return Map.of("success", false, "message", "Invalid credentials");
        }
        User user = userOpt.get();
        return Map.of("success", true, "role", user.getRole());
    }
}