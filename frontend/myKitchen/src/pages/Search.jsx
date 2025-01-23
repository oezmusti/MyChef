import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useState } from "react";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/recipes/search?query=${searchTerm}`);
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Daten.");
            }
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Fehler bei der Suche:", error);
        }
    };

    return (
        <>
            <Header />
            <main className="p-4">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Geben Sie einen Suchbegriff ein..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded w-full mb-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Suchen
                    </button>
                </form>

                {recipes.length > 0 ? (
                    <div className="mt-4">
                        <h2>Suchergebnisse:</h2>
                        <ul>
                            {recipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <h3>{recipe.name}</h3>
                                    <p>{recipe.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Keine Rezepte gefunden.</p>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Search;
