import React, { useState } from 'react';
import '../css/base.css';

function Form() {
    return (
        <>
            <div className='max-w-6xl mx-auto'>
                <form method="POST" action="/store-rezept" enctype="multipart/form-data">
                    <div className='flex gap-6'>

                        {/* Rechte Spalte */}
                        <div className='pr-6 w-[60%] border-r-2 border-gold-400'>
                            <div className='grid grid-cols-12 gap-5 mb-3'>

                                {/* Name */}
                                <div className='flex flex-col col-span-6'>
                                    <label className='pb-2' htmlFor="name"> Rezeptname</label>
                                    <input className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8' type="text" id="name" name='name' />
                                </div>

                                {/* Dauer */}
                                <div className='flex flex-col col-span-3'>
                                    <label className='pb-2' htmlFor="time"> Dauer</label>
                                    <input className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8' type="time" id="time" name='time' />
                                </div>

                                {/* Kategorie */}
                                <div className='flex flex-col col-span-3'>
                                    <label className='pb-2' htmlFor="lvl"> Aufwand </label>
                                    <select className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8' type="text" id="lvl" name='lvl'>
                                        <option value="none"></option>
                                        <option value="leicht">leicht</option>
                                        <option value="mittel">mittel</option>
                                        <option value="schwer">schwer</option>
                                    </select>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-5 mb-3'>
                                {/* Kategorie */}
                                <div className='flex flex-col'>
                                    <label className='pb-2' htmlFor="time"> Kategorie </label>
                                    <select className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8' type="text" id="categori" name='categori'>
                                        <option value="none"></option>
                                        <option value="Vollkost">Vollkost</option>
                                        <option value="Vegi">Vegetarisch</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="lowcarb">Low Carb</option>
                                        <option value="glutenfrei">Glutenfrei</option>
                                    </select>
                                </div>

                                {/* Tagesmahlzeiten */}
                                <div className='flex flex-col'>
                                    <label className='pb-2' htmlFor="mealtyp"> Tagesmahlzeiten </label>
                                    <select className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8' type="text" id="mealtyp" name='mealtyp'>
                                        <option value="none"></option>
                                        <option value="fruehstueck">Frühstück</option>
                                        <option value="mittag">Mittagessen</option>
                                        <option value="abend">Abendessen</option>
                                        <option value="deser">Deser</option>
                                        <option value="snack">Snack</option>
                                    </select>
                                </div>
                            </div>

                            {/* Zutaten */}
                            <div className='mb-3'>
                                <label className='pb-2' htmlFor="ingrediant"> Zutaten</label>
                                <textarea className='mt-2 w-full block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8' name="ingrediant" id="ingrediant"></textarea>
                            </div>

                            {/* steps */}
                            <div className='mb-3'>
                                <label className='pb-2' htmlFor="steps"> Steps</label>
                                <textarea className='mt-2 w-full block border border-gold-500 focus:border focus:border-gold-700 rounded-md' name="steps" id="steps"></textarea>
                            </div>
                        </div>

                        {/* Linke Spalte */}
                        <div className='w-[40%]'>

                            {/* Hauptbild */}
                            <div className='w-full h-64 bg-gold-300'>

                            </div>

                            {/* Sidebild 1 und 2 */}
                            <div className='flex gap-4 pt-4'>
                                <div className='w-full h-31 bg-gold-300'>

                                </div>

                                <div className='w-full h-32 bg-gold-300'>

                                </div>
                            </div>

                            {/* Sidebild 3 udn 4 */}
                            <div className='flex gap-4 pt-4'>
                                <div className='w-full h-31 bg-gold-300'>

                                </div>

                                <div className='w-full h-32 bg-gold-300'>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form;