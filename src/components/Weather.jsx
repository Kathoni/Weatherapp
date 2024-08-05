// src/WeatherApp.js
import React, { useState } from 'react';

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
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
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
  );
};

export default WeatherApp;
