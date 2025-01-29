import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useParams } from 'react-router-dom';

function EditDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        lvl: '',
        mealtyp: '',
        time: '',
        categories: [],
        publics: false,
        ingredients: '',
        steps: '',
        quantity: '',
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/recipes/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Laden des Rezepts');
                }
                return response.json();
            })
            .then((data) => {
                setFormData({
                    ...data,
                    categories: data.categories || [],
                    publics: data.publics || false,
                });
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const updatedCategories = checked
                ? [...prev.categories, value]
                : prev.categories.filter((category) => category !== value);
            return { ...prev, categories: updatedCategories };
        });
    };

    const handlePublicToggle = (e) => {
        setFormData({ ...formData, publics: e.target.checked });
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = new FormData();
        dataToSend.append("data", JSON.stringify(formData));

        try {
            const response = await fetch(`http://localhost:8080/api/recipes/${id}`, {
                method: "PUT",
                body: dataToSend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Rezept aktualisiert: ", result);
            navigate(`/detail/${id}`);
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Rezepts: ", error);
        }
    };

    if (loading) return <p>Lädt...</p>;
    if (error) return <p>Fehler: {error}</p>;


    // Rendering der Schritte
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
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
                    </div>
                );
            case 2:
                return (
                    <div className='grid grid-cols-2 gap-5 mb-3'>
                        <div>
                            {/* Schwierigkeit */}
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
                                <label className='pb-2' htmlFor="mealtyp"> Tagesmahlzeiten </label>
                                <select
                                    className='block border border-gold-500 focus:border focus:border-gold-700 rounded-md h-8'
                                    id="mealtyp"
                                    name='mealtyp'
                                    value={formData.mealtyp}
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
                                    type="text"
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
                                        <label htmlFor="vegan" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700 peer-checked:bg-gold-700 peer-checked:text-white">
                                            <div className="block text-sm mx-auto">
                                                Vegan
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="vegetarisch" value="vegetarisch" className="hidden peer" onChange={handleCategoryChange} />
                                        <label htmlFor="vegetarisch" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700 peer-checked:bg-gold-700 peer-checked:text-white">
                                            <div className="block text-sm mx-auto">
                                                Vegetarisch
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Vollkost" value="Vollkost" className="hidden peer" onChange={handleCategoryChange} />
                                        <label htmlFor="Vollkost" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700 peer-checked:bg-gold-700 peer-checked:text-white">
                                            <div className="block text-sm mx-auto">
                                                Vollkost
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="glutenfrei" value="glutenfrei" className="hidden peer" onChange={handleCategoryChange} />
                                        <label htmlFor="glutenfrei" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700 peer-checked:bg-gold-700 peer-checked:text-white">
                                            <div className="block text-sm mx-auto">
                                                Gluten-frei
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="low-carb" value="low-carb" className="hidden peer" onChange={handleCategoryChange} />
                                        <label htmlFor="low-carb" className="inline-flex items-center justify-between w-full h-8 text-gray-500 bg-white border-2 border-gold-500 rounded-lg cursor-pointer peer-checked:border-gold-700 peer-checked:bg-gold-700 peer-checked:text-white">
                                            <div className="block text-sm mx-auto">
                                                Low-Carb
                                            </div>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            {/* Öffentliches Rezept */}
                            <div className='mb-4'>
                                <label className="items-center me-5 cursor-pointer">
                                    <label className='' htmlFor="publics">Auf öffentlich stellen</label>
                                    <input type="checkbox" value="publics" id='publics' name='publics' checked={formData.publics} onChange={handlePublicToggle} className="sr-only peer" />
                                    <div className="mt-3 peer-checked:bg-gold-400 dark:bg-gold-200 peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className='grid grid-cols-3 gap-5 mb-3'>
                        {/* Qunatity */}
                        <div className='mb-4 col-span-1'>
                            <label className='pb-2' htmlFor="ingredients"> Menge* </label>
                            <textarea
                                className='mt-2 w-full h-64 block border border-gold-500 focus:border focus:border-gold-700 rounded-md'
                                name="quantity"
                                id="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        {/* Ingrediants */}
                        <div className='mb-4 col-span-2'>
                            <label className='pb-2' htmlFor="ingredients"> Zutaten* </label>
                            <textarea
                                className='mt-2 w-full h-64 block border border-gold-500 focus:border focus:border-gold-700 rounded-md'
                                name="ingredients"
                                id="ingredients"
                                value={formData.ingredients}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <div className='mb-4'>
                            <label className='pb-2' htmlFor="steps"> Zubereitungsschritte* </label>
                            <textarea
                                className='mt-2 w-full h-64 block border border-gold-500 focus:border focus:border-gold-700 rounded-md'
                                name="steps"
                                id="steps"
                                value={formData.steps}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <div className="content mt-16">
                <div className="flex max-w-5xl mx-auto shadow-xl font-Roboto">
                    <div className="w-[30%] h-[600px] bg-gold-600 rounded-tl-3xl rounded-bl-3xl">
                        <div className="text-white flex justify-center place-items-center items-center h-full">
                            <ul className="flex flex-col gap-6">
                                <li className={currentStep === 1 ? 'font-bold' : ''}>Allgemein</li>
                                <li className={currentStep === 2 ? 'font-bold' : ''}>Spezifikationen</li>
                                <li className={currentStep === 3 ? 'font-bold' : ''}>Zutaten</li>
                                <li className={currentStep === 4 ? 'font-bold' : ''}>Schritte</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-[70%] h-[600px] bg-white rounded-tr-3xl rounded-br-3xl relative">
                        <form className="p-10 h-full" onSubmit={handleSubmit}>
                            {renderStep()}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                {currentStep > 1 && (
                                    <button type="button" onClick={prevStep} className="btn-secondary">
                                        Zurück
                                    </button>
                                )}
                                {currentStep < 4 && (
                                    <button type="button" onClick={nextStep} className="btn-primary">
                                        Weiter
                                    </button>
                                )}
                                {currentStep === 4 && (
                                    <button type="submit" className="btn-primary">
                                        Speichern
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditDetail;
