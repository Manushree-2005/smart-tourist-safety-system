import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleFetchWeather = () => {
    setWeather({ temp: 25, condition: "Sunny" });
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleFetchWeather}>Check Weather</button>
      {weather && (
        <div>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}
