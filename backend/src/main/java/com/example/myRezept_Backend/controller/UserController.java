package com.example.myRezept_Backend.controller;

import com.example.myRezept_Backend.model.User;
import com.example.myRezept_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.myRezept_Backend.util.JwtTokenProvider;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") 
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

     @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {

         final Logger logger = LoggerFactory.getLogger(UserController.class);

            try {
                String token = authHeader.substring(7);
                String username = jwtTokenProvider.getUsernameFromToken(token);
                User user = userRepository.findByUsername(username);
    
                if (user == null) {
                    return ResponseEntity.notFound().build();
                }
    
                Map<String, String> response = new HashMap<>();
                response.put("username", user.getUsername()); 
                response.put("name", user.getName());
                return ResponseEntity.ok(response); 
            } catch (Exception e) {
                logger.error("Fehler beim Abrufen des aktuellen Benutzers", e);
                return ResponseEntity.status(500).body("Interner Serverfehler: " + e.getMessage());
            }
    }
}
