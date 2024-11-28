package com.example.myRezept_Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user") // Hier sicherstellen, dass der Name "user" verwendet wird
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String role = "USER"; // Standardrolle

    // Getter und Setter
}
