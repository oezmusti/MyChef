import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKacheltext from '../layout/RezeptKacheltext';

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
            <div className='content'>
                <div className='headline'>
                    Meine Rezepte
                </div>
                <div className='recipe-conainer'>
                    <div className='recipe-conainer-inner'>
                        {recipes.length === 0 ? (
                            <p>Keine Rezepte verfügbar.</p>
                        ) : (
                            recipes.map((recipe) => (
                                <RezepteKacheltext
                                    key={recipe.id}
                                    id={recipe.id}
                                    img={recipe.imageUrl}
                                    name={recipe.name}
                                    time={recipe.time}
                                    category={recipe.ingredients.split(', ').map((category, index) => (
                                        <li key={index}>{category}</li>
                                    ))}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserSettings;
