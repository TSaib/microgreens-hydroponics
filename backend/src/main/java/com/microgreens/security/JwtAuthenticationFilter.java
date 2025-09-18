package com.microgreens.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
    logger.info("[JwtAuthenticationFilter] Filter triggered for URI: {}", request.getRequestURI());
    logger.info("[JwtAuthenticationFilter] jwt.secret in use: [{}] (length={})", jwtUtil.getJwtSecret(), jwtUtil.getJwtSecret() != null ? jwtUtil.getJwtSecret().length() : "null");
        String authHeader = request.getHeader("Authorization");
        System.out.println("[JwtAuthenticationFilter] Authorization header: " + authHeader);
        String jwt = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            System.out.println("[JwtAuthenticationFilter] Extracted JWT: " + jwt);
            try {
                System.out.println("[JwtAuthenticationFilter] before calling getUsernameFromJwtToken(token)" );
                username = jwtUtil.getUsernameFromJwtToken(jwt);
                logger.info("[JwtAuthenticationFilter] Extracted username from JWT: {}", username);
            } catch (Exception e) {
                logger.warn("[JwtAuthenticationFilter] Invalid JWT token: {}", e.getMessage());
            }
        } else {
            logger.info("[JwtAuthenticationFilter] No Bearer token found in Authorization header");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateJwtToken(jwt)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.info("[JwtAuthenticationFilter] Authentication set for user: {}", username);
            } else {
                logger.warn("[JwtAuthenticationFilter] JWT token failed validation for user: {}", username);
            }
        }
        filterChain.doFilter(request, response);
    }
}
