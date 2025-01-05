package com.example.myRezept_Backend.repository;

import com.example.myRezept_Backend.model.Recipe;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Repository für Rezepte-Entitäten in MongoDB
 *
 * Dieses Interface erbt von {@link MongoRepository}, das CRUD-Operationen für die Verwaltung der Rezept-Daten bietet.
 *
// * @param <Recipe> Typ der Entität, die vom Repository verwaltet wird
// * @param <String> Typ des Primärschlüssels (ID) der Entität
 */
@Repository
public interface RecipeRepository extends MongoRepository<Recipe, ObjectId> {
}
