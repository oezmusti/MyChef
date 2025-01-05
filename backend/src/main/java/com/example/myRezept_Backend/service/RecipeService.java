package com.example.myRezept_Backend.service;

import com.example.myRezept_Backend.model.Recipe;
import com.example.myRezept_Backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;
    public List<Recipe> allRecipes() {
        return recipeRepository.findAll();
    }
}
