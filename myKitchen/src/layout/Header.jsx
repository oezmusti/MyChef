import React from 'react';
import '../css/base.css';
import '../js/base.js';

function Header() {
    return (
        <>
            <header className="relative shadow-lg px-3 py-2 h-[80px]">
                <nav className="flex justify-between items-center h-full">
                    <div className="flex items-center gap-3">
                        <div className="cursor-pointer" onClick="openNav()">
                            <img className="" src="\public\icons\burger.svg" alt="Burger Menue" />
                        </div>
                    </div>
                    <div className="w-[130px] md:w-[200px] flex items-center justify-center h-full">
                        Startseite
                    </div>
                    <div className="flex items-center gap-3 h-full">
                        <div className="flex items-center gap-2">
                            <button type="button"
                                className="hover:bg-clip-text hover:text-transparent bg-gradient-to-br from-[#A3D5D3] to-[#52796F] border-solid border-2 border-[#52796F] font-bold text-white px-5 py-2 rounded-full">
                                Login
                            </button>
                        </div>
                    </div>
                </nav>
                <div id="side-nav" className=" absolute top-0 z-50 min-h-screen w-full max-w-72 bg-[#83B799] side-off">
                    <div onclick="openNav()" className="w-auto h-auto cursor-pointer">
                        <img className="px-8 pt-8" src="../assets/icons/close.svg" alt="close" />
                        <div className="h-auto w-full mt-8">
                            <a href="">
                                <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                    <div className="h-[25px] w-[30px]">
                                        <img className="h-[25px] w-auto" src="../assets/icons/icon-add.svg" alt="Hinzufügen ICon" />
                                    </div>
                                    <div>
                                        Rezept Hinzufügen
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                    <div className="h-[25px] w-[30px]">
                                        <img className="h-[25px] w-auto" src="../assets/icons/icon-book.svg" alt="Hinzufügen ICon" />
                                    </div>
                                    <div>
                                        Meine Rezepte
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                    <div className="h-[25px] w-[30px]">
                                        <img className="h-[25px] w-auto" src="../assets/icons/icon-world.svg" alt="Hinzufügen ICon" />
                                    </div>
                                    <div>
                                        Globaler Bereich
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="w-full py-6 pl-8 hover:bg-[#52796F] transition-all duration-300 ease-in-out flex gap-4">
                                    <div className="h-[25px] w-[30px]">
                                        <img className="h-[25px] w-auto" src="../assets/icons/icon-like.svg" alt="Hinzufügen ICon" />
                                    </div>
                                    <div>
                                        Geleikte Rezepte
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;