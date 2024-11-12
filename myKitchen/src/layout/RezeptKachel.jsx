import React from 'react';
import '../css/komponent.css';
import '../css/fonts.css';

function RezepteKachel() {

    const rezept = {
        name: 'Hamburger',
        time: '30',
        img: '/uploads/hamburger.jpg',
        kategori: 'Vollkost',
        url: '/user/hamburger',
        isliked: 'true',
    };

    return (
        <>
            <div className='w-72 h-72 bg-white rounded-xl shadow-lg'>
                {/* Bild*/}
                <div>
                    <img className='w-full object-cover h-52 rounded-tr-xl rounded-tl-xl' src={rezept.img} alt={rezept.img} />
                </div>
                <div className='px-4 py-2 recepi-headline'>
                    <div>{rezept.name}</div>
                </div>
            </div>
        </>
    );
}

export default RezepteKachel;