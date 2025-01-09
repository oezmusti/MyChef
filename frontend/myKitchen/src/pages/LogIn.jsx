import React, { useState } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); // Verhindert, dass die Seite neu geladen wird

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Login erfolgreich!'); // Zeige Erfolgsnachricht
                setErrorMessage(''); // Lösche Fehlernachricht
                console.log('Benutzer-Token:', data.token); // Bearbeite das Token (z.B. speichere es im LocalStorage)
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Login fehlgeschlagen!');
            }
        } catch (error) {
            console.error('Login-Fehler:', error);
            setErrorMessage('Serverfehler. Bitte später erneut versuchen.');
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
                                Log IN
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
                                        onChange={(e) => setEmail(e.target.value)} // Aktualisiert den Zustand
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
                                        onChange={(e) => setPassword(e.target.value)} // Aktualisiert den Zustand
                                    />
                                </div>
                                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                                {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-gold-300 hover:bg-gold-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Noch kein Account?{' '}
                                    <a href="/register" className="font-medium text-gold-300 hover:underline">
                                        Jetzt registrieren
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

export default LogIn;
