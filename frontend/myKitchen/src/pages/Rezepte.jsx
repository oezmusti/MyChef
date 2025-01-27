import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKacheltext from '../layout/RezeptKacheltext';
import Filter from '../layout/Filter';
import Userabfrage from '../layout/Userabfrage';

function Rezepte() {
    //User bekommen 
    const [username, setUsername] = useState('');

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

    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        mealtyp: '',
        lvl: ''
    });

    <Userabfrage />

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
                setFilteredRecipes(data);
            })
            .catch((error) => console.error('Fehler beim Abrufen der Rezepte:', error));
    }, []);

    useEffect(() => {
        // Filterlogik anwenden
        const applyFilters = () => {
            let filtered = recipes;

            // Filter nach Publisher (Benutzername)
            if (username) {
                filtered = filtered.filter((recipe) => recipe.publisher === username);
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
    }, [filters, recipes, username]);

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
