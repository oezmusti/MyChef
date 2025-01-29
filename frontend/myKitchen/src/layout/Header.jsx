import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/base.css';


function Header() {
    // State-Variable für das Menü, ob es geöffnet ist oder nicht
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Hook für Navigation

    // Funktion zum Öffnen und Schließen des Menüs
    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);
    };

    //Funktion zum überprüfen des Login-Status
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Standardformular-Aktion verhindern
        if (searchTerm.trim()) {
            navigate(`/serch/${searchTerm.trim()}`);
        }
    };

    return (
        <>
            <header className="sticky top-0 shadow-lg px-3 py-2 h-[60px] bg-white z-[200]">
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
                                        placeholder="Döner Deluxe"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} // Eingabe verwalten
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="text-[#FFF] absolute end-2.5 bottom-1.5 bg-gold-200 hover:bg-gold-300 font-medium rounded-lg text-sm px-2 py-1"
                                    >
                                        Suche
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 h-full">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="border border-spacing-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-[#FFF] px-5 py-2 rounded-full">
                                Logout
                            </button>
                        ) : (
                            <>
                                <a href='/register' className='text-gold-500 '>
                                    Sign Up
                                </a>
                                <a href='/login' className="border border-spacing-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-[#FFF] px-5 py-2 rounded-full">
                                    Login
                                </a>
                            </>
                        )}
                    </div>
                </nav>

                {/* Seitennavigation */}
                <div
                    id="side-nav"
                    className={`fixed top-0 z-50 min-h-screen w-full max-w-72 bg-white  shadow-xl ${isNavOpen ? 'side-on' : 'side-off'}`}
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
                            <div className="w-full py-6 pl-8 hover:bg-[#afafaf] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/home.svg" alt="Hinzufügen Icon" />
                                </div>
                                <div>Home</div>
                            </div>
                        </a>
                        {isLoggedIn ? (
                            <>
                                <a href="/add-rezept">
                                    <div className="w-full py-6 pl-8 hover:bg-[#afafaf] transition-all duration-300 ease-in-out flex gap-4">
                                        <div className="h-[25px] w-[30px]">
                                            <img className="h-[25px] w-auto" src="/icons/icon-add.svg" alt="Hinzufügen Icon" />
                                        </div>
                                        <div>Rezept Hinzufügen</div>
                                    </div>
                                </a>
                                <a href="/rezepte">
                                    <div className="w-full py-6 pl-8 hover:bg-[#afafaf] transition-all duration-300 ease-in-out flex gap-4">
                                        <div className="h-[25px] w-[30px]">
                                            <img className="h-[25px] w-auto" src="/icons/icon-book.svg" alt="Meine Rezepte Icon" />
                                        </div>
                                        <div>Meine Rezepte</div>
                                    </div>
                                </a>
                            </>
                        ) : (
                            <>
                                <div>
                                </div>
                            </>
                        )}
                        <a href="/global-feed">
                            <div className="w-full py-6 pl-8 hover:bg-[#afafaf] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-world.svg" alt="Globaler Bereich Icon" />
                                </div>
                                <div>Globaler Bereich</div>
                            </div>
                        </a>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <div></div>
                        ) : (
                            <>
                                <div className='flex flex-col absolute bottom-9 button-pos'>
                                    <a href='/register' className='button primary-buton'>
                                        Jetzt registrieren
                                    </a>
                                    <a href='/login' className='button secondary-buton'>
                                        Login
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header >
        </>
    );
}

export default Header;
