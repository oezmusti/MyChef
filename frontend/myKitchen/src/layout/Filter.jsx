import React, { useState, useEffect, useRef } from 'react';
import '../css/base.css';

function Filter({ onFilterChange }) {
    const [categories, setCategories] = useState([]);
    const [mealType, setMealType] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [clickCount, setClickCount] = useState(0);

    const toggleMenu = (event) => {
        setClickCount((prev) => prev + 1); // Inkrementiere den Klickzähler
        if (clickCount % 2 === 0) { //Wenn zähler modulo 2 === 0 dann geht das Menü an
            setIsMenuOpen((prev) => !prev);
        } else {
            setIsMenuOpen(false); //Ansonsten wieder ausschalten 
        }
        //console.log(clickCount);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategories((prev) =>
            prev.includes(value) ? prev.filter((category) => category !== value) : [...prev, value]
        );
    };

    const handleMealTypeChange = (e) => {
        setMealType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange({ categories, mealType });
    };

    return (
        <>
            <div className="filter-container">
                {/* Filter-Button */}
                <div
                    id="filterbutton"
                    className="filter-button"
                    onClick={toggleMenu}
                >
                    <div className="filter-inner">
                        Filter
                    </div>
                </div>
                {/* Filter-Menü */}
                <div
                    id="filtermenue"
                    ref={menuRef}
                    className={` ${isMenuOpen ? '' : 'hidden'}`}
                >
                    <form onSubmit={handleSubmit}>
                        {/* Kategorien */}
                        <div className="flex flex-col mb-4">
                            <div className="pb-2">Kategorien</div>
                            <ul className="grid w-full gap-1 md:grid-cols-3">
                                {['vegan', 'vegetarisch', 'Vollkost', 'glutenfrei', 'low-carb'].map((category) => (
                                    <li key={category}>
                                        <input
                                            type="checkbox"
                                            id={`${category}-filter`}
                                            value={category}
                                            onChange={handleCategoryChange}
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`${category}-filter`}
                                            className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700  peer-checked:bg-gold-700 peer-checked:text-white"
                                        >
                                            <div className="block text-sm mx-auto">
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mahlzeitentyp */}
                        <div className="flex flex-col mb-4">
                            <label className="pb-2" htmlFor="mealType">
                                Tagesmahlzeiten
                            </label>
                            <select
                                className="block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8"
                                id="mealType"
                                name="mealType"
                                value={mealType}
                                onChange={handleMealTypeChange}
                            >
                                <option value="">Alle</option>
                                <option value="fruehstueck">Frühstück</option>
                                <option value="mittag">Mittagessen</option>
                                <option value="abend">Abendessen</option>
                                <option value="dessert">Dessert</option>
                                <option value="snack">Snack</option>
                            </select>
                        </div>

                        {/* Filtern-Button */}
                        <div className="">
                            <button
                                type="submit"
                                className="text-[#FFF] bg-gold-300 font-medium rounded-lg text-sm px-3 py-2 w-full"
                            >
                                Filtern
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Filter;
