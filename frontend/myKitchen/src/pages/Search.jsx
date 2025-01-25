import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKacheltext from '../layout/RezeptKacheltext';
import Filter from '../layout/Filter';

function Search() {
    const { searchTerm } = useParams(); // Suchbegriff aus URL
    const [recipes, setRecipes] = useState([]); // State für die Suchergebnisse
    const [loading, setLoading] = useState(true); // Ladezustand
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        mealtyp: '',
        lvl: ''
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/recipes/search?query=${searchTerm}`);
                if (response.ok) {
                    const data = await response.json();
                    setRecipes(data); // Ergebnisse speichern
                } else {
                    console.error('Fehler beim Abrufen der Daten.');
                }
            } catch (error) {
                console.error('Fehler:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [searchTerm]);

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
            {loading ? (
                <p>Wird geladen...</p>
            ) : recipes.length > 0 ? (
                <div className='content'>
                    <div className='headline'>
                        Suchergebnisse für: "{searchTerm}"
                    </div>
                    <div className='mb-5'>
                        <Filter onFilterChange={handleFilterChange} />
                    </div>
                    <div className='recipe-conainer'>
                        <div className='recipe-conainer-inner'>
                            {recipes.length === 0 ? (
                                <p>Keine Rezepte verfügbar.</p>
                            ) : (
                                filteredRecipes.map((recipe) => (
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
            ) : (
                <p>Keine Ergebnisse gefunden.</p>
            )}
            <Footer />
        </>
    );
}

export default Search;
