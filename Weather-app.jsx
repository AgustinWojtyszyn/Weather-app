import React, { useState } from 'react';
import './App.css'; // Cambié 'WeatherApp.css' por 'App.css'

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const apiKey = 'a9235e0f7dead7da7a6c58f6a7c2705f'; // Asegúrate de reemplazar esto con tu propia API key de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
      } else {
        alert('Ciudad no encontrada');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getTemperatureClass = () => {
    if (weather) {
      const temp = weather.temp;
      if (temp < 10) {
        return 'cold';
      } else if (temp >= 10 && temp <= 25) {
        return 'moderate';
      } else {
        return 'hot';
      }
    }
    return '';
  };

  return (
    <div className={`weather-app ${getTemperatureClass()}`}>
      <h1>Aplicación del Clima</h1>
      <input
        type="text"
        placeholder="Introduce la ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {weather && (
        <div>
          <h2>{weather.temp}°C</h2>
          <p>{weather.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
