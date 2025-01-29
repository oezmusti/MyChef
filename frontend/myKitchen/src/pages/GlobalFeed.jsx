import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKacheltext from '../layout/RezeptKacheltext';
import Filter from '../layout/Filter';

function GlobalFeed() {

    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        mealtyp: '',
        lvl: '',
        publics: true
    });

    useEffect(() => {
        fetch('http://localhost:8080/api/recipes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Rezepte');
                }
                return response.json();
            })
            .then((data) => {
                setRecipes(data);

            })
            .catch((error) => console.error('Fehler beim Abrufen der Rezepte:', error));
    }, []);

    useEffect(() => {
        // Filterlogik anwenden
        const applyFilters = () => {
            let filtered = recipes;

            // Filter nach Publics (nur öffentliche Rezepte)
            if (filters.publics) {
                filtered = filtered.filter((recipe) => recipe.publics === true);
            }

            // Filter nach Kategorien
            if (filters.categories.length > 0) {
                filtered = filtered.filter((recipe) =>
                    filters.categories.some((category) => recipe.categories.includes(category))
                );
            }

            // Filter nach Mahlzeitentyp
            if (filters.mealtyp) {
                filtered = filtered.filter((recipe) => recipe.mealtyp === filters.mealtyp);
            }

            // Filter nach lvl
            if (filters.lvl) {
                filtered = filtered.filter((recipe) => recipe.lvl === filters.lvl);
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
                    Globale Rezepte
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
                                        img={recipe.base64Image}
                                        name={recipe.name}
                                        publisher={recipe.publisher}
                                        time={recipe.time}
                                        category={Array.isArray(recipe.categories) ? recipe.categories.map((categories, index) => (
                                            <li key={index}>{categories}</li>
                                        )) : recipe.categories.split(', ').map((categories, index) => (
                                            <li key={index}>{categories}</li>
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

export default GlobalFeed;
