import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKachel from '../layout/RezeptKachel';
function Home() {
    return (
        <>
            <Header />
            <div className='content'>
                <div className='headline'>
                    Favoriten
                </div>
                <div className='flex flex-row gap-8'>
                    <RezepteKachel />
                    <RezepteKachel />
                    <RezepteKachel />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;