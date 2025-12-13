import React, { useState } from "react";

function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log("API response:", data);

      if (response.ok) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError(data.message || "City not found");
      }
    } catch (err) {
      setError("Network error");
      setWeather(null);
    }
  };

  return (
    <div>
      <h2>Weather Dashboard</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
