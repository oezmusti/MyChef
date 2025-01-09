import React, { useState, useEffect, useRef } from 'react';
import '../css/base.css';

function Filter() {
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
                    className={`filtermenue-container ${isMenuOpen ? '' : 'hidden'}`}
                >
                    <form action="">
                        {/* Ernährungsart */}
                        <div className="flex flex-col mb-4">
                            <div className="pb-2">Kategorien</div>
                            <ul className="grid w-full gap-1 md:grid-cols-3">
                                <li>
                                    <input
                                        type="checkbox"
                                        id="veganfilter"
                                        value="vegan"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="veganfilter"
                                        className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700  peer-checked:bg-gold-700 peer-checked:text-white"
                                    >
                                        <div className="block text-sm mx-auto">
                                            Vegan
                                        </div>
                                    </label>
                                </li>
                                {/* Weitere Kategorien */}
                                <li>
                                    <input
                                        type="checkbox"
                                        id="vegetarischfilter"
                                        value="vegetarisch"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="vegetarischfilter"
                                        className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700  peer-checked:bg-gold-700 peer-checked:text-white"
                                    >
                                        <div className="block text-sm mx-auto">
                                            Vegetarisch
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        id="Vollkostfilter"
                                        value="Vollkost"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="Vollkostfilter"
                                        className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700  peer-checked:bg-gold-700 peer-checked:text-whites"
                                    >
                                        <div className="block text-sm mx-auto">
                                            Vollkost
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        id="glutenfreifilter"
                                        value="glutenfrei"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="glutenfreifilter"
                                        className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700 peer-checked:bg-gold-700 peer-checked:text-white"
                                    >
                                        <div className="block text-sm mx-auto">
                                            Gluten-frei
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        id="low-carbfilter"
                                        value="low-carb"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="low-carbfilter"
                                        className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700  peer-checked:bg-gold-700 peer-checked:text-white"
                                    >
                                        <div className="block text-sm mx-auto">
                                            Low-Carb
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </div>

                        {/* Tagesmahlzeiten */}
                        <div className="flex flex-col mb-4">
                            <label className="pb-2" htmlFor="mealType">
                                Tagesmahlzeiten
                            </label>
                            <select
                                className="block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8"
                                id="mealType"
                                name="mealType"
                            >
                                <option value="none"></option>
                                <option value="fruehstueck">Frühstück</option>
                                <option value="mittag">Mittagessen</option>
                                <option value="abend">Abendessen</option>
                                <option value="deser">Deser</option>
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
