import React, { useState, useRef } from 'react';
import '../css/base.css';

function MyChefHero() {

    return (
        <>
            <div className='MC-Container'>
                <div className='content w-100'>
                    <div className='MC-flex'>
                        <div className='MC-left-side'>
                            <div className='MC-img-container'>
                                <img src="\MyChef_Logo.png" alt="MyChef Logo" className="MC-img-inner" />
                            </div>
                        </div>
                        <div className='MC-reight-side'>
                            <div>
                                <div>
                                    <h1 className='hl-1'> Willkommen bei <span className='hl-accente'> MyChef </span></h1>
                                    <h2 className='hl-2'> Hier bist <span className='hl-accente'> DU </span> der <span className='hl-accente'> Chef </span> </h2>
                                </div>
                                <div className='primary-button'>
                                    <a href="/register" className='button primary-buton'>
                                        Jetzt Regisstrieren
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyChefHero; 