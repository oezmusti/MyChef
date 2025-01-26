import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/komponent.css';
import '../css/fonts.css';

function RezepteKacheltext({ id, img, name, description, time, lvl, mealtyp, categories, ingredients, steps }) {
    const [isLiked, setIsLiked] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    function handleDelete() {
        fetch(`http://localhost:8080/api/recipes/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    alert('Fehler beim Löschen des Rezepts!');
                }
            })
            .catch((error) => {
                console.error('Fehler:', error);
                alert('Fehler beim Löschen des Rezepts!');
            });
    }

    return (
        <>
            <div className="w-72 h-72 bg-white rounded-xl shadow-lg relative">
                {/* Bild und Menü */}
                <div className="relative">
                    <Link to={`/detail/${id}`} >
                        <img className="w-full object-cover h-52 rounded-tr-xl rounded-tl-xl" src={img} alt={name} />
                    </Link>
                    <div className="absolute top-2 right-2">
                        <div onClick={toggleMenu} className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="black"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5h.01M12 12h.01M12 19h.01" />
                            </svg>
                        </div>
                        {menuVisible && (
                            <div
                                className="absolute bg-white shadow-md rounded-md z-50"
                                style={{ top: '0', left: '110%' }}
                                onMouseLeave={closeMenu}
                            >
                                <ul className="text-black font-Roboto p-2">
                                    <li className="recipe-li p-1 hover:bg-gray-200 cursor-pointer">Ansehen</li>
                                    <Link to={`/edit/${id}`} ><li className="recipe-li p-1 hover:bg-gray-200 cursor-pointer">Bearbeiten</li></Link>
                                    <li onClick={handleDelete} className="recipe-li p-1 hover:bg-gray-200 cursor-pointer delete">Löschen</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Rezeptinformationen */}
                <div className="px-4 py-2 recepi-headline">
                    <div>{name}</div>
                </div>
                <div className="flex px-4 justify-between w-full font-Roboto">
                    <div>{time} min</div>
                    <div className="flex space-x-2">
                        {/* Statische Überprüfung der Kategorien */}
                        {categories?.includes('Vollkost') && (
                            <img src="/icons/meat.png" alt="Vollkost" title="Vollkost" className="w-6 h-6" />
                        )}
                        {categories?.includes('Vegi') && (
                            <img src="/icons/vegi.png" alt="Vegi" title="Vegi" className="w-6 h-6" />
                        )}
                        {categories?.includes('Vegan') && (
                            <img src="/icons/vegan.png" alt="Vegan" title="Vegan" className="w-6 h-6" />
                        )}
                        {categories?.includes('lowcarb') && (
                            <img src="/icons/low-carb.png" alt="Low Carb" title="Low Carb" className="w-6 h-6" />
                        )}
                        {categories?.includes('glutenfrei') && (
                            <img src="/icons/gluten-frei.png" alt="Glutenfrei" title="Glutenfrei" className="w-6 h-6" />
                        )}
                    </div>
                </div>
                <div>
                    {categories?.join(', ')}
                </div>
            </div>
        </>
    );
}

export default RezepteKacheltext;
