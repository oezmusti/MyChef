package com.example.myRezept_Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // Hier sicherstellen, dass der Name "user" verwendet wird
public class User {
    @Id
    private String id;
    private String name;
    private String username;
    private String email;
    private String password;
    private String role = "USER"; // Standardrolle

    // Getter und Setter

<<<<<<< HEAD
    public String getId() {
        return id;
    }

    public String getName(){
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
=======
    public String getRole() {
        return role;
>>>>>>> bfd90f74a9ca940077d160dbf5f10c6358ff8590
    }

    public String getPassword() {
        return password;
    }

<<<<<<< HEAD
    public String getRole() {
        return role;
=======
    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getId() {
        return id;
>>>>>>> bfd90f74a9ca940077d160dbf5f10c6358ff8590
    }

    public void setId(String id) {
        this.id = id;
    }

<<<<<<< HEAD
    public void setName(String name){
        this.name = name;
    }

=======
>>>>>>> bfd90f74a9ca940077d160dbf5f10c6358ff8590
    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
