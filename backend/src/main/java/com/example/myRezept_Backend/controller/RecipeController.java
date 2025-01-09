package com.example.myRezept_Backend.controller;

import com.example.myRezept_Backend.model.Recipe;
import com.example.myRezept_Backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/recipes") //Basis-URL für alle Endpunkte in diesem Controller
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    // GET-Methode: Alle Rezepte abrufen
    @GetMapping
    public ResponseEntity<List<Recipe>> allRecipe() {
        return new ResponseEntity<>(recipeService.allRecipes(), HttpStatus.OK);
    }

    // POST-Methode: Neues Rezept erstellen
    @PostMapping
    public ResponseEntity<Recipe> createRecipe(
            @RequestParam("image") MultipartFile image,
            @RequestParam("data") String data) {

        try {
            // JSON in Recipe-Objekt umwandeln
            ObjectMapper objectMapper = new ObjectMapper();
            Recipe recipe = objectMapper.readValue(data, Recipe.class);

            // Bild speichern und die URL setzen
            String imageUrl = recipeService.saveImage(image);
            recipe.setImageUrl(imageUrl);

            // Rezept speichern
            Recipe savedRecipe = recipeService.saveRecipe(recipe);

            return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
        } catch (IOException e) {
            // Fehler beim Parsen der JSON-Daten
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Allgemeine Fehlerbehandlung
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
