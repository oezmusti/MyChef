import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKacheltext from '../layout/RezeptKacheltext';
import Filter from '../layout/Filter';

function Search() {
    //User bekommen 
    const [username, setUsername] = useState('');
    const { searchTerm } = useParams(); // Suchbegriff aus URL
    const [recipes, setRecipes] = useState([]); // State für die Suchergebnisse
    const [loading, setLoading] = useState(true); // Ladezustand
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        mealtyp: '',
        lvl: '',
        publics: true
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('userToken');


            if (!token) {
                setError("token not found");
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/api/users/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    //const data = await response.json();
                    const text = await response.text();
                    if (text) {
                        const data = JSON.parse(text);
                        setUsername(data.username);
                    } else {
                        console.error("Leere antwort erhalten...")
                    }
                    //setUsername(data.username);
                } else {
                    console.error('Benutzerdaten konnten nicht geladen werden.');
                }
            } catch (error) {
                console.error('Fehler beim Laden der Benutzerdaten:', error);
            }
        };
        fetchUserData()
    }, []);

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

            // Filter nach Publics (nur öffentliche Rezepte) oder Publisher (Benutzername)
            filtered = filtered.filter((recipe) =>
                recipe.publics === true || recipe.publisher === username
            );

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
    }, [username, filters, recipes]);


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
                                        img={recipe.base64Image}
                                        name={recipe.name}
                                        publisher={recipe.publisher}
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
