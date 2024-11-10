import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';

function Home() {
    return (
        <>
            <Header />
            <div>
                <h1>Willkommen auf der Startseite</h1>
                <p>Dies ist die Home-Seite der Anwendung.</p>
            </div>
            <Footer />
        </>
    );
}

export default Home;