package com.example.myRezept_Backend.controller;

import com.example.myRezept_Backend.model.Recipe;
import com.example.myRezept_Backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;

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

    //Get Methiode um das Rezept mit der entsprechenden ID abzurufen
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable String id) {
        try {
            // Konvertiere die String-ID in einen ObjectId
            ObjectId objectId = new ObjectId(id);

            // Rezept aus dem Service abrufen
            Recipe recipe = recipeService.findById(objectId);

            if (recipe != null) {
                return new ResponseEntity<>(recipe, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            // Falls die ID keine gültige ObjectId ist
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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

        // Bild im Backend-Verzeichnis speichern und URL setzen
        String imageUrl = recipeService.saveImageToProjectFolder(image);
        recipe.setImageUrl(imageUrl);

        // Rezept speichern
        Recipe savedRecipe = recipeService.saveRecipe(recipe);

        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
    } catch (IOException e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

    // GET: Rezepte durchsuchen
    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam("query") String query) {
        List<Recipe> recipes = recipeService.searchRecipes(query);
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    // DELETE-Methode: Rezept löschen
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable String id) {
        try {
            // Konvertiere die String-ID in einen ObjectId
            ObjectId objectId = new ObjectId(id);

            // Rezept aus dem Service löschen
            boolean deleted = recipeService.deleteRecipe(objectId);

            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Erfolgreiches Löschen
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Rezept nicht gefunden
            }
        } catch (IllegalArgumentException e) {
            // Falls die ID keine gültige ObjectId ist
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // PUT-Methode: Rezept aktualisieren
    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable String id, @RequestParam(value = "image", required = false) MultipartFile image, @RequestParam("data") String data) {
        try {
            // Konvertiere die String-ID in einen ObjectId
            ObjectId objectId = new ObjectId(id);

            // Rezept aus der DB abrufen
            Recipe existingRecipe = recipeService.findById(objectId);
            if (existingRecipe == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // JSON in Rezept-Objekt umwandeln
            ObjectMapper objectMapper = new ObjectMapper();
            Recipe updatedRecipe = objectMapper.readValue(data, Recipe.class);

            // Nur geänderte Felder aktualisieren
            if (updatedRecipe.getName() != null) existingRecipe.setName(updatedRecipe.getName());
            if (updatedRecipe.getDescription() != null) existingRecipe.setDescription(updatedRecipe.getDescription());
            if (updatedRecipe.getLvl() != null) existingRecipe.setLvl(updatedRecipe.getLvl());
            if (updatedRecipe.getMealtyp() != null) existingRecipe.setMealtyp(updatedRecipe.getMealtyp());
            if (updatedRecipe.getTime() != null) existingRecipe.setTime(updatedRecipe.getTime());
            if (updatedRecipe.getCategories() != null) existingRecipe.setCategories(updatedRecipe.getCategories());
            if (updatedRecipe.getIngredients() != null) existingRecipe.setIngredients(updatedRecipe.getIngredients());
            if (updatedRecipe.getQuantity() != null) existingRecipe.setQuantity(updatedRecipe.getQuantity());
            if (updatedRecipe.getSteps() != null) existingRecipe.setSteps(updatedRecipe.getSteps());
            if (updatedRecipe.getPublisher() != null) existingRecipe.setPublisher(updatedRecipe.getPublisher());
            if (updatedRecipe.isPublics() != existingRecipe.isPublics()) existingRecipe.setPublics(updatedRecipe.isPublics());

            // Wenn ein neues Bild hochgeladen wurde, speichern
            if (!image.isEmpty()) {
                String imageUrl = recipeService.saveImage(image);
                existingRecipe.setImageUrl(imageUrl);
            }

            // Rezept speichern
            Recipe savedRecipe = recipeService.saveRecipe(existingRecipe);

            return new ResponseEntity<>(savedRecipe, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // GET: random Rezept
    @GetMapping("/random")
    public ResponseEntity<Recipe> getRandomRecipe() {
        Recipe randomRecipe = recipeService.getRandomRecipe();
        return ResponseEntity.ok(randomRecipe);
    }
}
