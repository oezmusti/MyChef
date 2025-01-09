import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';

function UserSettings() {
    // Die Recipes-Komponente sollte außerhalb von UserSettings definiert sein oder direkt in die Render-Logik integriert werden.
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Daten von der API abrufen
        fetch('http://localhost:8080/api/recipes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Rezepte');
                }
                return response.json();
            })
            .then((data) => setRecipes(data))
            .catch((error) => console.error('Fehler beim Abrufen der Rezepte:', error));
    }, []);

    return (
        <>
            <Header /> {/* Optional: Header-Komponente */}
            <div className="recipes-container">
                <h1>Rezepte</h1>
                {recipes.length === 0 ? (
                    <p>Keine Rezepte verfügbar.</p>
                ) : (
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <h2>{recipe.name}</h2>
                            <p><strong>Beschreibung:</strong> {recipe.description}</p>
                            <p><strong>Schwierigkeitsgrad:</strong> {recipe.lvl}</p>
                            <p><strong>Mahlzeittyp:</strong> {recipe.mealtyp}</p>
                            <p><strong>Zubereitungszeit:</strong> {recipe.time} Minuten</p>
                            <h3>Zutaten:</h3>
                            <ul>
                                {recipe.ingredients.split(', ').map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                            <h3>Schritte:</h3>
                            <ol>
                                {recipe.steps.split(', ').map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                            <img
                                src={`http://localhost:8080/images/${recipe.id}.jpg`} // Bild-URL anpassen
                                alt={`${recipe.name} Bild`}
                                className="recipe-image"
                            />
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
}

export default UserSettings;
