import React, { useState } from 'react';

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite


        try {

            const role = 'User';

            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                    role,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Registrierung erfolgreich! Bitte logge dich ein.');
                setErrorMessage('');
                console.log('Erfolgreiche Registrierung:', data);
            } else {
                console.error('Serverantwort:', errorData);
                setErrorMessage('Registrierung fehlgeschlagen!');
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Registrierung fehlgeschlagen!');
                setSuccessMessage('');
            }

        }
        catch (error) {
            console.error('Registrierungsfehler:', error);
            setErrorMessage('Serverfehler. Bitte später erneut versuchen.');
            setSuccessMessage('');
        }

    };

    return (
        <>
            <div className='absolute -z-20 top-0 left-0'>
                <img className='w-[50vw] h-screen' src="/assets/backgrounds/Hintergrund_Kochen.jpg" alt="Background" />
            </div>
            <section className="bg-gray-50 relative z-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gold-400 md:text-2xl">
                                Registrieren
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="border border-gold-500 text-gray-900 rounded-lg block w-full p-2.5"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} // Aktualisiert Name
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Benutzername</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="border border-gold-500 text-gray-900 rounded-lg block w-full p-2.5"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} // Aktualisiert Benutzername
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-Mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="border border-gold-500 text-gray-900 rounded-lg block w-full p-2.5"
                                        placeholder="name@company.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Aktualisiert E-Mail
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Passwort</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gold-500 rounded-lg block w-full p-2.5"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} // Aktualisiert Passwort
                                    />
                                </div>
                                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                                {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-gold-300 hover:bg-gold-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Registrieren
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Du hast schon ein Account?{' '}
                                    <a href="/login" className="font-medium text-gold-300 hover:underline">
                                        Jetzt anmelden
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
