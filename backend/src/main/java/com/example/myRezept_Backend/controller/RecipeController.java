package com.example.myRezept_Backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipes") //Basis-URL für alle Endpunkte in diesem Controller
public class RecipeController {
    @GetMapping
    public String allRecipe() {
        return "Alle Rezepte";
    }
}
