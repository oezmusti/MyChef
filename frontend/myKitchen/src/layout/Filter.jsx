import React from 'react';
import '../css/base.css';

function Filter() {
    return (
        <>
            <div className="filter-container">
                <div className='filter-button'>
                    <div className="filter-inner">
                        Filter
                    </div>
                </div>

                <div className='filtermenue-container'>
                    <form action="">
                        <div className='flex flex-col mb-4'>
                            <div className='pb-2'> Kategorien</div>
                            <ul className="grid w-full gap-1 md:grid-cols-3">
                                <li>
                                    <input type="checkbox" id="vegan" value="vegan" className="hidden peer" />
                                    <label htmlFor="vegan" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                        <div className="block text-sm mx-auto">
                                            Vegan
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="vegetarisch" value="vegetarisch" className="hidden peer" />
                                    <label htmlFor="vegetarisch" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                        <div className="block text-sm mx-auto">
                                            Vegetarisch
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="Vollkost" value="Vollkost" className="hidden peer" />
                                    <label htmlFor="Vollkost" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                        <div className="block text-sm mx-auto">
                                            Vollkost
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="glutenfrei" value="glutenfrei" className="hidden peer" />
                                    <label htmlFor="glutenfrei" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                        <div className="block text-sm mx-auto">
                                            Gluten-frei
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="low-carb" value="low-carb" className="hidden peer" />
                                    <label htmlFor="low-carb" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                        <div className="block text-sm mx-auto">
                                            Low-Carb
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Filter; 