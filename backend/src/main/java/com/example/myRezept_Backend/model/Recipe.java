package com.example.myRezept_Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipe")
public class Recipe {

    @Id
    private String id;
    private String name;
    private String description;
    private String lvl;
    private String mealtyp;
    private String time;
    private String ingredients;
    private String steps;

    // Standard-Konstruktor
    public Recipe() {}

    // Konstruktor mit params


    public Recipe(String id, String name, String description, String lvl, String mealtyp, String time, String ingredients, String steps) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.lvl = lvl;
        this.mealtyp = mealtyp;
        this.time = time;
        this.ingredients = ingredients;
        this.steps = steps;
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

    //lvl
    public String getLvl() {
        return lvl;
    }

    public void setLvl(String lvl) {
        this.lvl = lvl;
    }

    public String getMealtyp() {
        return mealtyp;
    }

    public String getTime() {
        return time;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getSteps() {
        return steps;
    }

    public void setMealtyp(String mealtyp) {
        this.mealtyp = mealtyp;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }
}
