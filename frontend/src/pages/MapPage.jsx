import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import { getCurrentLocation } from "../utils/locationHelper";

export default function MapPage() {
  const [destination, setDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getCurrentLocation().then(setUserLocation).catch(console.error);
  }, []);

  const handleSetDestination = () => {
    if (inputValue.toLowerCase().includes("hospital")) {
      setDestination({ lat: 28.615, lng: 77.21 });
    } else if (inputValue.toLowerCase().includes("police")) {
      setDestination({ lat: 28.6139, lng: 77.209 });
    } else {
      alert("Unknown destination. Using default coordinates.");
      setDestination({ lat: 28.708, lng: 77.106 });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 80px)" }}>
      <div style={{ padding: "20px", flex: "0 0 auto", background: "#f7f9fc" }}>
        <h1>Safe Route Navigation</h1>
        <input
          type="text"
          placeholder="Enter destination"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: "10px", width: "250px", borderRadius: "8px", border: "1px solid gray", marginRight: "10px" }}
        />
        <button
          onClick={handleSetDestination}
          style={{ padding: "10px 15px", borderRadius: "8px", border: "none", backgroundColor: "#0077cc", color: "#fff", cursor: "pointer" }}
        >
          Go
        </button>
      </div>

      <div style={{ flex: "1 1 auto" }}>
        <MapView destination={destination} userLocation={userLocation} />
      </div>
    </div>
  );
}
