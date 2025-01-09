import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';


function EditRezept() {
    return (
        <>
            <Header />
            <div className='content'>
                <div className='container'>
                    <div className='box'>
                        <img src='/uploads/hamburger.jpg' alt='Recipe Picture'>
                        </img>
                    </div>
                    <div className='box'>
                        <div className='headline' contentEditable>
                            Hamburger
                        </div>
                        <p contentEditable> Ich bin eine Beschreibung des Gerichts. Hier muss noch die Zubereitungszeit rein und aus welcher Kategorie das Gericht ist.
                            Der Speichern-Button fehlt, der die Daten in der Datenbank überschreibt. Alles muss noch dynamisch gemacht werden und an die Datenbank angeschlossen werden.
                        </p>
                    </div>
                </div>
                <div className='container'>
                    <div className='box'>
                        <div className='recepi-headline'>
                            Zutaten
                        </div>
                        <ul contentEditable>
                            <li>Zutat 1</li>
                            <li>Zutat 2</li>
                            <li>Zutat 3</li>
                            <li>Zutat 4</li>
                            <li>Zutat 5</li>
                            <li>Zutat 6</li>
                            <li>Zutat 7</li>
                            <li>Zutat 8</li>
                        </ul>
                    </div>
                    <div className='box'>
                        <div className='recepi-headline'>
                            Zubereitung
                        </div>
                        <sub contentEditable>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </sub>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    );
}

export default EditRezept;