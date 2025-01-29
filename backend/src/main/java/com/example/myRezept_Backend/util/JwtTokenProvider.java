package com.example.myRezept_Backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.security.Key;

import java.util.Date;

@Component
public class JwtTokenProvider {


    @Value("${jwt.expiration}")
    private int jwtExpiration;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        System.out.println("JWT Expiration: " + jwtExpiration); // JWT Ablaufdatum
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                //.signWith(SignatureAlgorithm.HS512, jwtSecret)
                .signWith(key)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                //.setSigningKey(jwtSecret)
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            //Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            System.out.println("Token is valid: "+ token);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}