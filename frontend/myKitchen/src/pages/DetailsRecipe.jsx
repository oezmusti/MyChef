import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useParams } from 'react-router-dom';

function DetailsRecipe() {
    const { id } = useParams(); // ID aus URL holen
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/recipes/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Laden des Rezepts');
                }
                return response.json();
            })
            .then((data) => {
                setRecipe(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Header />
            <div>
                <h1>{recipe.name}</h1>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Zubereitungszeit: {recipe.time} Minuten</p>
                <p>Kategorie: {recipe.category}</p>
                <p>Zutaten:</p>
                <ul>
                    {recipe.ingredients.split(', ').map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <p>Zubereitung:</p>
                <p>{recipe.steps}</p>
            </div>
            <div className='content'>
                <div className='container'>
                    <div className='box'>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                    </div>
                    <div className='box'>
                        <div className='headline'>
                            {recipe.name}
                        </div>
                        <p>
                            {recipe.description}
                        </p>
                    </div>
                </div>
                <div className='container'>
                    <div className='box'>
                        <div className='recepi-headline'>
                            Zutaten
                        </div>
                        <ul>
                            {recipe.ingredients.split(', ').map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='box'>
                        <div className='recepi-headline'>
                            Zubereitung
                        </div>
                        <ul>
                            {recipe.steps.split(', ').map((steps, index) => (
                                <li key={index}>
                                    <div>
                                        Steps {index + 1}
                                    </div>
                                    <div>
                                        {steps}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default DetailsRecipe;
