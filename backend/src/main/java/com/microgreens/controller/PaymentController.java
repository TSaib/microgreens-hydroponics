package com.microgreens.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {
    // Replace with your Razorpay API key and secret
    private static final String RAZORPAY_KEY = "YOUR_KEY_HERE";
    private static final String RAZORPAY_SECRET = "YOUR_SECRET_HERE";

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data) {
        try {
            // Accept amount in rupees, convert to paise for Razorpay
            double amountRupees = Double.parseDouble(data.get("amount").toString());
            int amountPaise = (int) Math.round(amountRupees * 100);
            RazorpayClient client = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);
            JSONObject options = new JSONObject();
            options.put("amount", amountPaise);
            options.put("currency", "INR");
            options.put("receipt", "order_rcptid_" + System.currentTimeMillis());
            Order order = client.orders.create(options);
            System.out.println("order created: " + order);
            return Map.of(
                "Razorpay order id", order.get("id"),
                "amount", order.get("amount"),
                "currency", order.get("currency"),
                "receipt", order.get("receipt"),
                "status", order.get("status")
            );
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }
}
