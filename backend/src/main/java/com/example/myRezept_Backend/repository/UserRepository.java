package com.example.myRezept_Backend.repository;

import com.example.myRezept_Backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
    User findByEmail(String email); // Benutzer anhand E-Mail finden
    boolean existsByUsername(String username);
    boolean existsByEmail(String email); // Prüfen, ob E-Mail existiert
}
