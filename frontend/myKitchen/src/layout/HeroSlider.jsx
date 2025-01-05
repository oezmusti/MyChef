import React, { useState } from 'react';
import '../css/base.css';

function HeroSlider({ name, description, time, category, backgroundImage }) {

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

    const getCategoryIcon = () => {
        switch (category) {
            case 'Vollkost':
                return <img src="/icons/meat.png" alt="Vollkost" />;
            case 'Vegi':
                return <img src="/icons/vegi.png" alt="Vegi" />;
            case 'Vegan':
                return <img src="/icons/vegan.png" alt="Vegan" />;
            case 'lowcarb':
                return <img src="/icons/low-carb.png" alt="Low Carb" />;
            case 'glutenfrei':
                return <img src="/icons/gluten-frei.png" alt="Glutenfrei" />;
            default:
                return null;
        }
    };

    return (
        <>
            <a href="">
                <div className="hero-container">
                    <div className="hero-background-container">
                        <img className="hero-background" src={backgroundImage} alt={`${name} background`} />
                    </div>
                    <div className="hero-overlay"></div>
                    <div className="content relative h-[80vh]">
                        <div className="hero-text-container">
                            <div className="hero-headline text-Work-Sans">
                                <h1>{name}</h1>
                            </div>
                            <div className="hero-description">
                                {description}
                            </div>
                            <div className="hero-recepi-info">
                                <div>{getCategoryIcon()}</div>
                                <div>{time} min</div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </>
    )
}
export default HeroSlider;