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

    function handlePrint() {
        window.print();
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div className='content DetailBackground'>

                <div className='ExportImg-Container'>
                    <img className='ExportImage' src="\MyChef_Logo.png" alt="Logo" />
                </div>
                <div>
                    <div className='recipe-headline'>{recipe.name}</div>
                </div>

                <div className='recipe-subheadline'>Zutaten:</div>
                <div className='recipe-ingrediantlist'>
                    <div className='ingrediants'>
                        <ul>
                            {recipe.ingredients.split('; ').map((ingredient, index) => (
                                <li className='ingredient-steps' key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='quantitys'>
                        <ul>
                            {recipe.quantity.split('; ').map((quantity, index) => (
                                <li className='ingredient-steps' key={index}>{quantity}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='recipe-subheadline'>
                    Zubereitung
                </div>
                <ul>
                    {recipe.steps.split(';').map((steps, index) => (
                        <li className='steps-container' key={index}>
                            <div className='steps'>
                                Step {index + 1}
                            </div>
                            <div>
                                {steps}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
}

export default DetailsRecipe;