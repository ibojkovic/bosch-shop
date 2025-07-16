package com.example.backend.utils;

import com.example.backend.models.User;
import io.jsonwebtoken.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

public String generateToken(User user) {
    System.out.println("generisanje tokena: ");
    System.out.println("JWT SECRET: " + secret);
System.out.println("DECODED SECRET LENGTH: " + Base64.getDecoder().decode(secret).length);

    try {
        Key key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
        String token = Jwts.builder()
                .setSubject(user.getId())
                .claim("username", user.getUsername())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        System.out.println("GENERISAN TOKEN: " + token);
        return token;
    } catch (Exception e) {
        System.out.println("GREŠKA PRI GENERISANJU TOKENA:");
        e.printStackTrace();  // PRAVI PROBLEM ĆE BITI OVDE
        return null;
    }
}





    public String getUserIdFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    public boolean validateToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));

            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

}
