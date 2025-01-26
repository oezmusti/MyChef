package com.example.myRezept_Backend.service;

import com.example.myRezept_Backend.model.Recipe;
import com.example.myRezept_Backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.bson.types.ObjectId;
import java.time.Instant;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@Service
public class RecipeService {

    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> allRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    // Methode zum Speichern des Bildes
    // public String saveImage(MultipartFile image) {
    //     String imageUrl = null;
    //     try {
    //         // Stelle sicher, dass der Uploads-Ordner existiert
    //         ensureUploadsFolderExists();

    //         // Bild lokal speichern
    //         String filename = image.getOriginalFilename();
    //         File file = new File("uploads/" + filename);
    //         image.transferTo(file);

    //         // Gebe die URL des gespeicherten Bildes zurück
    //         imageUrl = "/uploads/" + filename;
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //     }
    //     return imageUrl;
    // }

    // //Ptüfen ob der Uploads Ordener existiert und wenn nicht anlegen
    // private void ensureUploadsFolderExists() {
    //     File uploadsFolder = new File("uploads");
    //     if (!uploadsFolder.exists()) {
    //         boolean created = uploadsFolder.mkdirs(); // Erstelle den Ordner (inkl. Elternordner falls nötig)
    //         if (created) {
    //             System.out.println("Uploads-Ordner wurde erfolgreich erstellt.");
    //         } else {
    //             System.err.println("Fehler beim Erstellen des Uploads-Ordners.");
    //         }
    //     }
    // }

    private static final String UPLOADS_FOLDER = "uploads";

    public String saveImage(MultipartFile image) throws IOException {
        logger.info("saveImage aufgerufen");

        // Stelle sicher, dass der Uploads-Ordner existiert
        ensureUploadsFolderExists(UPLOADS_FOLDER);

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
        logger.info("Generierter Dateiname: " + uniqueFilename);

        // Zielpfad erstellen
        File destinationFile = new File(UPLOADS_FOLDER, uniqueFilename);

        // Datei speichern
        image.transferTo(destinationFile);
        logger.info("Bild erfolgreich gespeichert: " + destinationFile.getAbsolutePath());

        // URL zurückgeben
        String baseUrl = "http://localhost:8080"; // Passe die Base-URL an deine Konfiguration an
        return baseUrl + "/uploads/" + uniqueFilename;
    }

    // private void ensureUploadsFolderExists() {
    //     File uploadsFolder = new File(UPLOADS_FOLDER);
    //     if (!uploadsFolder.exists()) {
    //         boolean created = uploadsFolder.mkdirs();
    //         if (created) {
    //             System.out.println("Uploads-Ordner wurde erfolgreich erstellt: " + uploadsFolder.getAbsolutePath());
    //         }
    //     }
    // }
    private void ensureUploadsFolderExists(String uploadDir) {
        File folder = new File(uploadDir);
        if (!folder.exists()) {
            boolean created = folder.mkdirs();
            if (created) {
                logger.info("Uploads-Ordner wurde erfolgreich erstellt: " + uploadDir);
            } else {
                logger.error("Fehler beim Erstellen des Uploads-Ordners.");
            }
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
        String imageUrl = null;
        try {
            // Absoluten Pfad des Projekts ermitteln
            String projectPath = System.getProperty("user.dir"); // Pfad des Projektverzeichnisses
            String uploadDir = projectPath + "/uploads"; // Zielverzeichnis

            // Sicherstellen, dass der Ordner existiert
            ensureUploadsFolderExists(uploadDir);

            // Bilddatei speichern
            String filename = image.getOriginalFilename();
            File destinationFile = new File(uploadDir, filename);
            image.transferTo(destinationFile);

            // Rückgabe der relativen URL
            imageUrl = "/uploads/" + filename;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageUrl;
    }

    // private void ensureUploadsFolderExists(String uploadDir) {
    //     File folder = new File(uploadDir);
    //     if (!folder.exists()) {
    //         boolean created = folder.mkdirs();
    //         if (created) {
    //             System.out.println("Uploads-Ordner wurde erfolgreich erstellt: " + uploadDir);
    //         } else {
    //             System.err.println("Fehler beim Erstellen des Uploads-Ordners.");
    //         }
    //     }
    // }

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
