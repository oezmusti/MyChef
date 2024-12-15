package com.example.myRezept_Backend.controller;

import com.example.myRezept_Backend.model.User;
import com.example.myRezept_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user); // Benutzer wird gespeichert
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Alle Benutzer zurückgeben
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username); // Benutzer anhand des Benutzernamens finden
    }
}