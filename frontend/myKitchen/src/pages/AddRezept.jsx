import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import Form from '../layout/Form';
import FormV2 from '../layout/FormV2';

function AddRezept() {
    return (
        <>
            <Header />
            <div className='content mt-16'>
                <FormV2 />
            </div>
            <Footer />
        </>
    );
}

export default AddRezept; 