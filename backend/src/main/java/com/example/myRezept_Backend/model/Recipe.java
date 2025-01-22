package com.example.myRezept_Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "recipe")
public class Recipe {

    @Id
    private String id;
    private String name;
    private String description;
    private String lvl;
    private String mealtyp;
    private String time;

    // Verwende eine List<String> anstelle von String für Kategorien
    private List<String> categories;

    private boolean publics;
    private String ingredients;
    private String quantity ;
    private String steps;
    private String imageUrl;
    private String publisher;
    // Standard-Konstruktor
    public Recipe() {}

    // Konstruktor mit params
    public Recipe(String id, String name, String description, String lvl, String mealtyp, String time, List<String> categories, boolean publics, String ingredients, String quantity, String steps, String imageUrl, String publisher) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.lvl = lvl;
        this.mealtyp = mealtyp;
        this.time = time;
        this.categories = categories;
        this.publics = publics;
        this.ingredients = ingredients;
        this.quantity = quantity;
        this.steps = steps;
        this.imageUrl = imageUrl;
        this.publisher = publisher;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getQuantity() {
        return quantity;
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

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // Kategorien Getter und Setter
    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    // Publikumsstatus Getter und Setter
    public boolean isPublics() {
        return publics;
    }

    public void setPublics(boolean publics) {
        this.publics = publics;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
