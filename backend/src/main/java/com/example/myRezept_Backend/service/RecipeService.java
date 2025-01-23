package com.example.myRezept_Backend.service;

import com.example.myRezept_Backend.model.Recipe;
import com.example.myRezept_Backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.bson.types.ObjectId;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> allRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    // Methode zum Speichern des Bildes
    public String saveImage(MultipartFile image) {
        String imageUrl = null;
        try {
            // Stelle sicher, dass der Uploads-Ordner existiert
            ensureUploadsFolderExists();

            // Bild lokal speichern
            String filename = image.getOriginalFilename();
            File file = new File("uploads/" + filename);
            image.transferTo(file);

            // Gebe die URL des gespeicherten Bildes zurück
            imageUrl = "/uploads/" + filename;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageUrl;
    }

    //Ptüfen ob der Uploads Ordener existiert und wenn nicht anlegen
    private void ensureUploadsFolderExists() {
        File uploadsFolder = new File("uploads");
        if (!uploadsFolder.exists()) {
            boolean created = uploadsFolder.mkdirs(); // Erstelle den Ordner (inkl. Elternordner falls nötig)
            if (created) {
                System.out.println("Uploads-Ordner wurde erfolgreich erstellt.");
            } else {
                System.err.println("Fehler beim Erstellen des Uploads-Ordners.");
            }
        }
    }

    public Recipe findById(ObjectId  id) {
        return recipeRepository.findById(id).orElse(null);
    }

    // Suche nach Rezepten
//    public List<Recipe> searchRecipes(String query) {
//        return recipeRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrIngredientsContainingIgnoreCaseOrCategoriesContaining(
//                query, query, query, query);
//    }
}
