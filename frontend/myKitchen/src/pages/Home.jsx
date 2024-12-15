import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKachel from '../layout/RezeptKachel';
import Suche from '../komponente/Suche';
function Home() {
    return (
        <>
            <Header />
            <div className='content'>
                <div>
                    <Suche />
                </div>
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