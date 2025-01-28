package com.example.myRezept_Backend.service;

import com.example.myRezept_Backend.model.Recipe;
import com.example.myRezept_Backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.bson.types.ObjectId;
import java.time.Instant;
import java.util.UUID;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@Service
public class RecipeService {
    private static final String UPLOADS_FOLDER = "frontend/myKitchen/public/uploads";

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> allRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public String saveImage(MultipartFile image) throws IOException {
        //logger.info("saveImage aufgerufen");

        String projectPath = System.getProperty("user.dir");
        String fullUploadPath = projectPath + "/" + UPLOADS_FOLDER;

        // Stelle sicher, dass der Uploads-Ordner existiert
        ensureUploadsFolderExists(fullUploadPath);

        // Originaler Dateiname
        String originalFilename = image.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new IllegalArgumentException("Der Dateiname ist ungültig.");
        }

        // Dateiendung extrahieren (z. B. ".jpg", ".png")
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex);
        }

        // Eindeutiger Dateiname mit Zeitstempel und UUID
        String uniqueFilename = Instant.now().getEpochSecond() + "_" + UUID.randomUUID() + extension;

        // Zielpfad erstellen
        File destinationFile = new File(UPLOADS_FOLDER, uniqueFilename);

        // Datei speichern
        image.transferTo(destinationFile);

        return UPLOADS_FOLDER + "/" + uniqueFilename;
    }

    private void ensureUploadsFolderExists(String uploadDir) {
        File folder = new File(uploadDir);
        if (!folder.exists()) {
            boolean created = folder.mkdirs();

        }
    }

    public Recipe findById(ObjectId  id) {
        return recipeRepository.findById(id).orElse(null);
    }

    // Suche nach Rezepten
    public List<Recipe> searchRecipes(String query) {
        return recipeRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrIngredientsContainingIgnoreCaseOrCategoriesContainingIgnoreCaseOrTimeContainingIgnoreCaseOrMealtypContaining(
                query, query, query, query, query, query);
    }

    public boolean deleteRecipe(ObjectId id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe != null) {
            recipeRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public String saveImageToProjectFolder(MultipartFile image) {
        try {
            // Absoluten Pfad des Projekts ermitteln
            String projectPath = System.getProperty("user.dir"); // Pfad des Projektverzeichnisses
            String uploadDir = projectPath + File.separator + UPLOADS_FOLDER;
            File uploadsFolder = new File(uploadDir);

            if (!uploadsFolder.exists()) {
                uploadsFolder.mkdirs();
            }

            String originFilename = image.getOriginalFilename();
            String fileExtension = originFilename.substring(originFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

            File destinationFile = new File(uploadDir + File.separator + uniqueFilename);

            // Bilddatei speichern
            image.transferTo(destinationFile);

            // Rückgabe der relativen URL
            return "/uploads/" + uniqueFilename;
        } catch (IOException e) {
            throw new RuntimeException("Fehler beim Speichern des Bildes", e);
        }
    }

    // Random Rezept
    public Recipe getRandomRecipe() {
        List<Recipe> recipes = recipeRepository.findAll();
        if (recipes.isEmpty()) {
            return null;
        }
        Random random = new Random();
        return recipes.get(random.nextInt(recipes.size()));
    }
}
