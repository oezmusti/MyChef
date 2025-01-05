package com.example.myRezept_Backend.controller;

import com.example.myRezept_Backend.model.Recipe;
import com.example.myRezept_Backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recipes") //Basis-URL für alle Endpunkte in diesem Controller
public class RecipeController {
    @Autowired
    private RecipeService recipeService;
    @GetMapping
    public ResponseEntity<List<Recipe>> allRecipe() {
        return new ResponseEntity<List<Recipe>>(recipeService.allRecipes(), HttpStatus.OK);
    }
}
