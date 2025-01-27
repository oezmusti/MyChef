import React, { useState, useEffect } from 'react';

function Userabfrage() {
    //User bekommen 
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('userToken');


            if (!token) {
                setError("token not found");
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/api/users/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    //const data = await response.json();
                    const text = await response.text();
                    if (text) {
                        const data = JSON.parse(text);
                        setUsername(data.username);
                    } else {
                        console.error("Leere antwort erhalten...")
                    }
                    //setUsername(data.username);
                } else {
                    console.error('Benutzerdaten konnten nicht geladen werden.');
                }
            } catch (error) {
                console.error('Fehler beim Laden der Benutzerdaten:', error);
            }
        };
        fetchUserData()
    }, []);
}

export default Userabfrage;