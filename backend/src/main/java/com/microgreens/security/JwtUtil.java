package com.microgreens.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {
    private final String jwtSecret = "your_super_secret_jwt_key";
    private final long jwtExpirationMs = 86400000; // 24h

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getEmail(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public String getRole(String token) {
        return (String) Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("role");
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}