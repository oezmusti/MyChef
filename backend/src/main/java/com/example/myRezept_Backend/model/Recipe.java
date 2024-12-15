package com.example.myRezept_Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipe")
public class Recipe {

    @Id
    private String id;
    private String name;
    private String description;

    // Standard-Konstruktor
    public Recipe() {}

    // Konstruktor mit params
    public Recipe(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getter und Setter
    // ID
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    // Name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    // Description
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

}
