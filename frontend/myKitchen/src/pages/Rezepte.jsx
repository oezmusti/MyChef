import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';

function Home() {
    return (
        <>
            <Header />
            <div className='content'>
                <h1>Über Uns</h1>
                <p>Hier erfahrt ihr mehr über diese Anwendung.</p>
            </div>
            <Footer />
        </>
    );
}

export default Home;