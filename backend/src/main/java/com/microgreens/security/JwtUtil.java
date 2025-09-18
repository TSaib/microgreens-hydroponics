package com.microgreens.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
    

@Component
public class JwtUtil {
    //@Value("${jwt.secret:your_super_secret_jwt_key}")
    @Value("${jwt.secret}")
    private String jwtSecret;
    private final long jwtExpirationMs = 86400000; // 24h

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    @jakarta.annotation.PostConstruct
    public void logSecret() {
        logger.info("[JwtUtil] jwt.secret in use: [{}] (length={})", jwtSecret, jwtSecret != null ? jwtSecret.length() : "null");
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                //.signWith(SignatureAlgorithm.HS512, jwtSecret)
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getEmail(String token) {
        System.out.println("[JwtUtil] Inside getEmail(token) " + (jwtSecret != null ? jwtSecret.length() : "null"));
        //return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
        return Jwts.parser()
            .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public String getRole(String token) {
        System.out.println("[JwtUtil] Inside getRole(token) " + (jwtSecret != null ? jwtSecret.length() : "null"));
        //return (String) Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("role");
        return Jwts.parser()
            .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
            .parseClaimsJws(token)
            .getBody()
            .get("role", String.class);
    }

    public boolean validateJwtToken(String authToken) {
        try {
            //Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes())).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

        // Alias for compatibility with standard JWT filter naming
    public String getUsernameFromJwtToken(String token) {
        System.out.println("[JwtUtil] Inside getUsernameFromJwtToken(token)" );
        return getEmail(token);
    }

        public String getJwtSecret() {
        return jwtSecret;
    }

}