import React, { useState } from 'react';
import '../css/base.css';

function FormV2() {
    // State to track the current step
    const [currentStep, setCurrentStep] = useState(1);

    // State to store form data for all steps
    const [formData, setFormData] = useState({
        image: null,
        name: '',
        description: '',
        lvl: '',
        mealType: '',
        time: '',
        categories: [],
        public: false,
        ingredients: '',
        steps: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    // Handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, image: file });
        }
    };

    // Handle input change for other fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle checkbox change for categories
    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, categories: [...formData.categories, value] });
        } else {
            setFormData({
                ...formData,
                categories: formData.categories.filter((category) => category !== value)
            });
        }
    };

    // Handle public toggle
    const handlePublicToggle = (e) => {
        setFormData({ ...formData, public: e.target.checked });
    };

    // Function to go to the next step
    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 4)); // Assuming 4 steps
    };

    // Function to go to the previous step
    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Hier kannst du die Daten weiter verarbeiten, z.B. per POST Request an den Server schicken
    };

    // Render the current step
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="relative h-full">
                        <div className='mb-6'>
                            <label htmlFor="imageUpload" className='block text-sm font-medium text-gray-700'></label>
                            <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className='hidden' />

                            {/* Upload Box - Visible */}
                            <div className='cursor-pointer mt-4 w-[200px] h-[150px] border-2 border-dashed border-gold-500 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100' onClick={() => document.getElementById('imageUpload').click()}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className='w-full h-full object-cover' />
                                ) : (
                                    <span className='text-gray-500 text-center'>Klicken und Bild <br /> hochladen</span>
                                )}
                            </div>
                        </div>

                        {/* Name */}
                        <div className='flex flex-col mb-4'>
                            <label className='pb-2' htmlFor="name"> Rezeptname*</label>
                            <input
                                className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8'
                                type="text"
                                id="name"
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Beschreibung */}
                        <div className='mb-3'>
                            <label className='pb-2' htmlFor="description"> Beschreibung*</label>
                            <textarea
                                className='mt-2 w-full h-32 block border border-gold-500 focus:border focus:border-gold-700 rounded-md'
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className='absolute bottom-4 right-6'>
                            <a onClick={nextStep} className="button text-[#FFF] bg-gold-300 font-medium rounded-lg text-sm px-3 py-2">Weiter</a>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="relative h-full">
                        <div className='grid grid-cols-2 gap-5 mb-3'>
                            <div>
                                {/* Kategorie */}
                                <div className='flex flex-col col-span-3 mb-4'>
                                    <label className='pb-2' htmlFor="lvl"> Aufwand </label>
                                    <select
                                        className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8'
                                        id="lvl"
                                        name='lvl'
                                        value={formData.lvl}
                                        onChange={handleInputChange}
                                    >
                                        <option value="none"></option>
                                        <option value="leicht">leicht</option>
                                        <option value="mittel">mittel</option>
                                        <option value="schwer">schwer</option>
                                    </select>
                                </div>

                                {/* Tagesmahlzeiten */}
                                <div className='flex flex-col mb-4'>
                                    <label className='pb-2' htmlFor="mealType"> Tagesmahlzeiten </label>
                                    <select
                                        className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8'
                                        id="mealType"
                                        name='mealType'
                                        value={formData.mealType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="none"></option>
                                        <option value="fruehstueck">Frühstück</option>
                                        <option value="mittag">Mittagessen</option>
                                        <option value="abend">Abendessen</option>
                                        <option value="deser">Deser</option>
                                        <option value="snack">Snack</option>
                                    </select>
                                </div>

                                {/* Dauer */}
                                <div className='flex flex-col col-span-3 mb-4'>
                                    <label className='pb-2' htmlFor="time"> Dauer</label>
                                    <input
                                        className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8'
                                        type="time"
                                        id="time"
                                        name='time'
                                        value={formData.time}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Kategorie */}
                                <div className='flex flex-col mb-4'>
                                    <div className='pb-2'> Kategorien</div>
                                    <ul className="grid w-full gap-6 md:grid-cols-3">
                                        <li>
                                            <input type="checkbox" id="vegan" value="vegan" className="hidden peer" onChange={handleCategoryChange} />
                                            <label htmlFor="vegan" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                                <div className="block text-sm mx-auto">
                                                    Vegan
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="vegetarisch" value="vegetarisch" className="hidden peer" onChange={handleCategoryChange} />
                                            <label htmlFor="vegetarisch" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                                <div className="block text-sm mx-auto">
                                                    Vegetarisch
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="Vollkost" value="Vollkost" className="hidden peer" onChange={handleCategoryChange} />
                                            <label htmlFor="Vollkost" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                                <div className="block text-sm mx-auto">
                                                    Vollkost
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="glutenfrei" value="glutenfrei" className="hidden peer" onChange={handleCategoryChange} />
                                            <label htmlFor="glutenfrei" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700">
                                                <div className="block text-sm mx-auto">
                                                    Gluten-frei
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Öffentliches Rezept */}
                            <div className='mb-4'>
                                <label class="items-center me-5 cursor-pointer">
                                    <label className='' htmlFor="public">Auf öffentlich stellen</label>
                                    <input type="checkbox" value="public" id='public' name='public' checked={formData.public} onChange={handlePublicToggle} className="sr-only peer" />
                                    <div class="mt-3 peer-checked:bg-gold-400 dark:bg-gold-200 peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                </label>
                            </div>
                        </div>

                        <div className='absolute bottom-4 right-[6.5rem]'>
                            <a onClick={prevStep} className="button text-[#FFF] bg-gold-200 font-medium rounded-lg text-sm px-3 py-2">Zurück</a>
                        </div>
                        <div className='absolute bottom-4 right-6'>
                            <a onClick={nextStep} className="button text-[#FFF] bg-gold-300 font-medium rounded-lg text-sm px-3 py-2">Weiter</a>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="relative h-full">
                        <div className='mb-4'>
                            <label className='pb-2' htmlFor="ingredients"> Zutaten* </label>
                            <textarea
                                className='mt-2 w-full h-32 block border border-gold-500 focus:border focus:border-gold-700 rounded-md'
                                name="ingredients"
                                id="ingredients"
                                value={formData.ingredients}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className='absolute bottom-4 right-[6.5rem]'>
                            <a onClick={prevStep} className="button text-[#FFF] bg-gold-200 font-medium rounded-lg text-sm px-3 py-2">Zurück</a>
                        </div>
                        <div className='absolute bottom-4 right-6'>
                            <a onClick={nextStep} className="button text-[#FFF] bg-gold-300 font-medium rounded-lg text-sm px-3 py-2">Weiter</a>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="relative h-full">
                        <div className='mb-4'>
                            <label className='pb-2' htmlFor="steps"> Zubereitungsschritte* </label>
                            <textarea
                                className='mt-2 w-full h-32 block border border-gold-500 focus:border focus:border-gold-700 rounded-md'
                                name="steps"
                                id="steps"
                                value={formData.steps}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className='absolute bottom-4 right-[6.5rem]'>
                            <a onClick={prevStep} className="button text-[#FFF] bg-gold-200 font-medium rounded-lg text-sm px-3 py-2">Zurück</a>
                        </div>
                        <div className='absolute bottom-4 right-6'>
                            <button type="submit" className="text-[#FFF] bg-gold-300 font-medium rounded-lg text-sm px-3 py-2">Senden</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='flex max-w-5xl mx-auto shadow-xl font-Roboto'>
            {/* Navigation */}
            <div className='w-[30%] h-[600px] bg-gold-600 rounded-tl-3xl rounded-bl-3xl'>
                <div className='text-white flex justify-center place-items-center items-center h-full'>
                    <ul className='flex flex-col gap-6'>
                        <li>
                            <div className={currentStep === 1 ? 'font-bold' : ''}>Allgemein</div>
                        </li>
                        <li>
                            <div className={currentStep === 2 ? 'font-bold' : ''}>Spezifikationen</div>
                        </li>
                        <li>
                            <div className={currentStep === 3 ? 'font-bold' : ''}>Zutaten</div>
                        </li>
                        <li>
                            <div className={currentStep === 4 ? 'font-bold' : ''}>Schritte</div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Multi-Formular */}
            <div className='w-[70%] h-[600px] bg-white rounded-tr-3xl rounded-br-3xl relative'>
                <form className='p-10 h-full' method="POST" action="/store-rezept" encType="multipart/form-data" onSubmit={handleSubmit}>
                    {renderStep()}
                </form>
            </div>
        </div>
    );
}

export default FormV2;
