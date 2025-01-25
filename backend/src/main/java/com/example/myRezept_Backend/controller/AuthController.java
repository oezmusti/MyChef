package com.example.myRezept_Backend.controller;

import com.example.myRezept_Backend.model.User;
import com.example.myRezept_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.myRezept_Backend.util.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Prüfen, ob Username oder E-Mail bereits existiert
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Der Nutzername existiert bereits");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Die Email existiert bereits");
        }

        // Passwort hashen und Benutzer speichern
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Nutzer wurde angelegt");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        // Benutzer anhand der E-Mail finden
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user.getUsername());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String userJson = objectMapper.writeValueAsString(user);
            response.put("user", userJson);
            System.out.println("User logged in: " + user.getUsername());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error converting user to JSON");
        }
        response.put("message", "User logged in successfully");
        System.out.println("Login erfolgreich: " + user.getEmail());
        return ResponseEntity.ok(response);
    }
}
