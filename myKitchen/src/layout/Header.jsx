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
            <header className="relative shadow-lg px-3 py-2 h-[80px]">
                <nav className="flex justify-between items-center h-full">
                    <div className="flex items-center gap-3">
                        {/* Burger-Icon mit onClick für das Menü-Toggle */}
                        <div className="cursor-pointer" onClick={toggleNav}>
                            <img src="/icons/burger.svg" alt="Burger Menu" />
                        </div>
                    </div>
                    <div className="w-[130px] md:w-[200px] flex items-center justify-center h-full">
                        Startseite
                    </div>
                    <div className="flex items-center gap-3 h-full">
                        <button
                            type="button"
                            className="hover:bg-clip-text hover:text-transparent bg-gradient-to-br from-[#A3D5D3] to-[#52796F] border-solid border-2 border-[#52796F] font-bold text-white px-5 py-2 rounded-full"
                        >
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
                        <a href="">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-add.svg" alt="Hinzufügen Icon" />
                                </div>
                                <div>Rezept Hinzufügen</div>
                            </div>
                        </a>
                        <a href="">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-book.svg" alt="Meine Rezepte Icon" />
                                </div>
                                <div>Meine Rezepte</div>
                            </div>
                        </a>
                        <a href="">
                            <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                <div className="h-[25px] w-[30px]">
                                    <img className="h-[25px] w-auto" src="/icons/icon-world.svg" alt="Globaler Bereich Icon" />
                                </div>
                                <div>Globaler Bereich</div>
                            </div>
                        </a>
                        <a href="">
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
