import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';

function Liked() {
    return (
        <>
            <Header />
            <div className='content'>
                <h1>Liked</h1>
                <p>Geliketes</p>
            </div>
            <Footer />
        </>
    );
}

export default Liked; 