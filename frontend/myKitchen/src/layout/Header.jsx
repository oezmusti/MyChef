import React, { useState } from 'react';
import '../css/base.css';

function Header() {
    // State-Variable für das Menü, ob es geöffnet ist oder nicht
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Funktion zum Öffnen und Schließen des Menüs
    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);
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
                    <div className="w-[130px] md:w-[200px] flex items-center justify-center h-full">

                        {/* Searchbar */}
                        <form className="">
                            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-96 h-[40px] p-4 ps-10 text-sm text-gray-900 border border-gold-300 rounded-lg" placeholder="Suche..." required />
                                <button type="submit" className="text-[#FFF] absolute end-2.5 bottom-1.5 bg-gold-200 hover:bg-gold-300 font-medium rounded-lg text-sm px-2 py-1">Search</button>
                            </div>
                        </form>

                    </div>
                    <div className="flex items-center gap-3 h-full">
                        <a href='' className='text-gold-500 '>
                            Sign Up
                        </a>
                        <button type="button" className="border border-spacing-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-[#FFF] px-5 py-2 rounded-full">
                            Login
                        </button>
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
                                    <img className="h-[25px] w-auto" src="/icons/icon-like.svg" alt="Geleikte Rezepte Icon" />
                                </div>
                                <div>Geleikte Rezepte</div>
                            </div>
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
