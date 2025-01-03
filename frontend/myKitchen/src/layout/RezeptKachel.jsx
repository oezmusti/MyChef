import React, { useState } from 'react';
import '../css/komponent.css';
import '../css/fonts.css';

function RezepteKachel() {
    const rezept = {
        name: 'Hamburger',
        time: '30',
        img: '/uploads/hamburger.jpg',
        kategori: 'Vollkost',
        url: '/user/hamburger',
        isliked: 'false',
    };

    // Zustand verwalten
    const [isLiked, setIsLiked] = useState(rezept.isliked === 'true');

    // Funktion zum Umschalten des Liked-Status
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <>
            < a href = '/details' /*Verlinkung zu RezeptDetail*/>
                <div className='w-72 h-72 bg-white rounded-xl shadow-lg'>
                    {/* Bild */}
                        <div className='relative'>
                            <div>
                                <img className='w-full object-cover h-52 rounded-tr-xl rounded-tl-xl' src={rezept.img} alt={rezept.img} />
                            </div>
                            <div className='w-12 h-9 absolute z-30 top-2 left-2'>
                                <div className='flex justify-center place-items-center items-center h-full' onClick={handleLikeClick}>
                                    <svg
                                        width="30"
                                        height="28"
                                        viewBox="0 0 20 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="heart" // Hinzufügen der CSS-Klasse "heart"
                                    >
                                        <path
                                            d="M8.88658 16.6603L8.88586 16.6596C6.30103 14.3157 4.19577 12.4033 2.73087 10.6111C1.27147 8.82559 0.49999 7.22062 0.49999 5.5C0.49999 2.68674 2.69554 0.5 5.49999 0.5C7.08884 0.5 8.62205 1.24223 9.62057 2.40564L9.99999 2.84771L10.3794 2.40564C11.3779 1.24223 12.9111 0.5 14.5 0.5C17.3044 0.5 19.5 2.68674 19.5 5.5C19.5 7.22062 18.7285 8.82559 17.2691 10.6111C15.8042 12.4033 13.699 14.3157 11.1141 16.6596L11.1134 16.6603L9.99999 17.6738L8.88658 16.6603Z"
                                            fill={isLiked ? 'red' : 'transparent'} // Dynamisches Füllen
                                            stroke="black" // Der Stroke bleibt immer sichtbar
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    <div className='px-4 py-2 recepi-headline'>
                        <div>{rezept.name}</div>
                    </div>
                    <div className='flex px-4 justify-between w-full font-Roboto'>
                        {/* Zeit */}
                        <div>
                            {rezept.time} min
                        </div>
                        {/* Kategorie */}
                        <div>
                            {rezept.kategori === 'Vollkost' && (
                                <img src="/icons/meat.png" alt="Vollkost" />
                            )}
                            {rezept.kategori === 'Vegi' && (
                                <img src="/icons/vegi.png" alt="Vegi" />
                            )}
                            {rezept.kategori === 'Vegan' && (
                                <img src="/icons/vegan.png" alt="Vegan" />
                            )}
                            {rezept.kategori === 'lowcarb' && (
                                <img src="/icons/low-carb.png" alt="Low Carb" />
                            )}
                            {rezept.kategori === 'glutenfrei' && (
                                <img src="/icons/gluten-frei.png" alt="Glutenfrei" />
                            )}
                        </div>
                    </div>
                </div>
            </a>
        </>
    );
}

export default RezepteKachel;
