// src/WeatherApp.js
import React, { useState } from 'react';
import Myimage from '../Assets/weather.jpg';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await fetch(` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=41e2b7ac474a47496aebac3adf329ae8`);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#fadbd8',
            color: '#333',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '600px',
                width: '100%',
            }}>
                <h1>Weather App</h1>
                <img src={Myimage} alt="" style={{
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '25px'
                }} />
                <input
                    style={{
                        padding: '10px 20px',
                        borderRadius: '15px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        backgroundColor: '#fdedec',
                        color: '#333',
                        cursor: 'pointer',
                        marginTop: '10px',
                        border: 'none'
                    }}
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeh
                    older="Enter city name"
                />
                <br />
                <button onClick={fetchWeather}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '15px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        backgroundColor: '#fdedec',
                        color: '#333',
                        cursor: 'pointer',
                        marginTop: '10px',
                        border: 'none'
                    }}>Get Weather</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {weatherData && (
                    <div>
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Humidity: {weatherData.main.humidity} %</p>
                        <p>Condition: {weatherData.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
