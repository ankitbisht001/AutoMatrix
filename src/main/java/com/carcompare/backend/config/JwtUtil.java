package com.carcompare.backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final String SECRET = "your_super_secret_key_for_jwt_token_which_should_be_long"; // should be at least 256-bit
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token); // throws if invalid
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String generateToken(String email, Long userId) {
        return generateToken(email, userId, "ROLE_USER"); // default role
    }

    public String generateToken(String email, Long userId, String role) {
        return Jwts.builder()
                .claim("userId", userId)
                .claim("role", role)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Long extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        Object userIdObj = claims.get("userId");
        if (userIdObj != null) {
            return Long.parseLong(userIdObj.toString());
        }
        return null;
    }

    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        Object roleObj = claims.get("role");
        return roleObj != null ? roleObj.toString() : null;
    }
}
