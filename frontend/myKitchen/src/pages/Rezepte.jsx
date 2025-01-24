import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKacheltext from '../layout/RezeptKacheltext';
import Filter from '../layout/Filter';

function Rezepte() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        mealType: ''
    });

    useEffect(() => {
        // Daten von der API abrufen
        fetch('http://localhost:8080/api/recipes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Rezepte');
                }
                return response.json();
            })
            .then((data) => {
                setRecipes(data);
                setFilteredRecipes(data); // Alle Rezepte initial anzeigen
            })
            .catch((error) => console.error('Fehler beim Abrufen der Rezepte:', error));
    }, []);

    useEffect(() => {
        // Filterlogik anwenden
        const applyFilters = () => {
            let filtered = recipes;

            // Filter nach Kategorien
            if (filters.categories.length > 0) {
                filtered = filtered.filter((recipe) =>
                    filters.categories.some((category) => recipe.categories.includes(category))
                );
            }

            // Filter nach Mahlzeitentyp
            if (filters.mealType) {
                filtered = filtered.filter((recipe) => recipe.mealType === filters.mealType);
            }

            setFilteredRecipes(filtered);
        };

        applyFilters();
    }, [filters, recipes]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <Header />
            <div className='content'>
                <div className='headline'>
                    Meine Rezepte
                </div>
                <div className='mb-5'>
                    <Filter onFilterChange={handleFilterChange} />
                </div>
                <div className='recipe-conainer'>
                    <div className='recipe-conainer-inner'>
                        {filteredRecipes.length === 0 ? (
                            <p>Keine Rezepte verfügbar.</p>
                        ) : (
                            filteredRecipes.map((recipe) => (
                                <div key={recipe.id}>
                                    <RezepteKacheltext
                                        id={recipe.id}
                                        img={recipe.imageUrl}
                                        name={recipe.name}
                                        time={recipe.time}
                                        category={recipe.ingredients.split(', ').map((category, index) => (
                                            <li key={index}>{category}</li>
                                        ))}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Rezepte;
