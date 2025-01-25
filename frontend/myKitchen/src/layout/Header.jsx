import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/base.css';
import Filter from './Filter';

function Header() {
    // State-Variable für das Menü, ob es geöffnet ist oder nicht
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Funktion zum Öffnen und Schließen des Menüs
    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);
    };

    const [searchTerm, setSearchTerm] = useState(''); // State für das Suchfeld
    const navigate = useNavigate(); // Hook für Navigation

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Standardformular-Aktion verhindern
        if (searchTerm.trim()) {
            navigate(`/serch/${searchTerm.trim()}`); // Benutzer zur Suchseite weiterleiten
        }
    };

    return (
        <>
            <header className="relative shadow-lg px-3 py-2 h-[60px]">
                <nav className="flex justify-between items-center h-full">
                    <div className="flex items-center gap-3">
                        {/* Burger-Icon mit onClick für das Menü-Toggle */}
                        <div className="cursor-pointer" onClick={toggleNav}>
                            <img className='h-[25px ]' src="/icons/burger.svg" alt="Burger Menu" />
                        </div>
                    </div>
                    <div className='hidden sm:block'>
                        <div className="w-[130px] md:w-[200px] flex items-center justify-center h-full">

                            {/* Searchbar */}
                            <form onSubmit={handleSearchSubmit}>
                                <label htmlFor="default-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block w-96 h-[40px] p-4 ps-10 text-sm text-gray-900 border border-gold-300 rounded-lg"
                                        placeholder="Suche..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} // Eingabe verwalten
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="text-[#FFF] absolute end-2.5 bottom-1.5 bg-gold-200 hover:bg-gold-300 font-medium rounded-lg text-sm px-2 py-1"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 h-full">
                        <a href='/register' className='text-gold-500 '>
                            Sign Up
                        </a>
                        <a href='/login' className="border border-spacing-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-[#FFF] px-5 py-2 rounded-full">
                            Login
                        </a>
                    </div>
                </nav>

                {/* Seitennavigation */}
                <div
                    id="side-nav"
                    className={`absolute top-0 z-50 min-h-screen w-full max-w-72 bg-[#83B799] ${isNavOpen ? 'side-on' : 'side-off'}`}
                >
                    {/* Close-Icon mit onClick für das Menü-Toggle */}
                    <div onClick={toggleNav} className="w-auto h-auto cursor-pointer">
                        <img className="px-8 pt-8" src="/icons/close.svg" alt="close" />
                    </div>
                    <div className='pl-4 mt-5 block sm:hidden'>
                        <div className="w-full flex items-center justify-center h-full">

                            {/* Searchbar */}
                            <form onSubmit={handleSearchSubmit}>
                                <label htmlFor="default-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block  h-[40px] p-4 ps-10 text-sm text-gray-900 border border-gold-300 rounded-lg"
                                        placeholder="Suche..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} // Eingabe verwalten
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="text-[#FFF] absolute end-2.5 bottom-1.5 bg-gold-200 hover:bg-gold-300 font-medium rounded-lg text-sm px-2 py-1"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="h-auto w-full mt-8">
                        <a href="/">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/home.svg" alt="Hinzufügen Icon" />
                                </div>
                                <div>Home</div>
                            </div>
                        </a>
                        <a href="/add-rezept">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-add.svg" alt="Hinzufügen Icon" />
                                </div>
                                <div>Rezept Hinzufügen</div>
                            </div>
                        </a>
                        <a href="/rezepte">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-book.svg" alt="Meine Rezepte Icon" />
                                </div>
                                <div>Meine Rezepte</div>
                            </div>
                        </a>
                        <a href="global-feed">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-world.svg" alt="Globaler Bereich Icon" />
                                </div>
                                <div>Globaler Bereich</div>
                            </div>
                        </a>
                        <a href="liked">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-like.svg" alt="Favorisierte Rezepte Icon" />
                                </div>
                                <div>Favorisierte Rezepte</div>
                            </div>
                        </a>
                    </div>
                </div>
            </header >
        </>
    );
}

export default Header;
