import React, { useState, useEffect } from 'react';

function RecipeOfTheDay() {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeOfTheDay = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/recipes/random');
                if (response.ok) {
                    const data = await response.json();
                    setRecipe(data);
                } else {
                    console.error('Fehler beim Abrufen des Rezepts des Tages.');
                }
            } catch (error) {
                console.error('Fehler:', error);
            }
        };

        fetchRecipeOfTheDay();
    }, []);

    if (!recipe) {
        return <p>Wird geladen...</p>;
    }

    return (
        <div className="recipe-of-the-day">
            <h2>Rezept des Tages</h2>
            <br />
            <h3>{recipe.name}</h3>
            <img src={recipe.imageUrl} alt={recipe.name} />
        </div>
    );
}

export default RecipeOfTheDay;