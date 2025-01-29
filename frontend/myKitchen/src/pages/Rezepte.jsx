import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKacheltext from '../layout/RezeptKacheltext';
import Filter from '../layout/Filter';
import Userabfrage from '../layout/Userabfrage';

function Rezepte() {
    const [username, setUsername] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        mealtyp: '',
        lvl: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('userToken');

            if (!token) {
                console.error("Token not found");
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
                    const text = await response.text();
                    if (text) {
                        const data = JSON.parse(text);
                        setUsername(data.username);
                    } else {
                        console.error("Leere Antwort erhalten...");
                    }
                } else {
                    console.error('Benutzerdaten konnten nicht geladen werden.');
                }
            } catch (error) {
                console.error('Fehler beim Laden der Benutzerdaten:', error);
            }
        };
        fetchUserData();
    }, []);

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
        const applyFilters = () => {
            let filtered = recipes;

            // ANzeigen der Rezepte des Users 
            if (username) {
                filtered = filtered.filter((recipe) => recipe.publisher === username);
            }

            // Categories filter 
            if (filters.categories.length > 0) {
                filtered = filtered.filter((recipe) =>
                    filters.categories.some((category) => recipe.categories.includes(category))
                );
            }

            //Mealtyp filter 
            if (filters.mealtyp) {
                filtered = filtered.filter((recipe) => recipe.mealtyp === filters.mealtyp);
            }

            //Lvl Filter 
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
                                        img={recipe.base64Image}
                                        name={recipe.name}
                                        time={recipe.time}
                                        publisher={recipe.publisher}
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

export default Rezepte;