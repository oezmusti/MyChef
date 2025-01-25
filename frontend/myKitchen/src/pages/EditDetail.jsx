import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useParams } from 'react-router-dom';

function EditDetail() {
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
                {recipe.name}
            </div>
            <Footer />
        </>
    );
}

export default EditDetail; 