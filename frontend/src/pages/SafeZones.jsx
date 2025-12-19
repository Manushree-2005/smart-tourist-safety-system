import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";
import SafeZoneMarker from "../components/SafeZoneMarker";
import { getCurrentLocation } from "../utils/locationHelper";

function SafeZones() {
  const [userLocation, setUserLocation] = useState(null);

  const zones = [
    { name: "Police Station", position: { lat: 28.6139, lng: 77.209 }, description: "24/7 emergency support" },
    { name: "Hospital", position: { lat: 28.615, lng: 77.21 }, description: "Immediate medical help" },
    { name: "Tourist Help Center", position: { lat: 28.616, lng: 77.208 }, description: "Support for travelers" },
  ];

  useEffect(() => {
    getCurrentLocation().then(setUserLocation).catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nearby Safe Zones</h1>

      <MapView destination={null} userLocation={userLocation}>
        {zones.map((zone, idx) => (
          <SafeZoneMarker key={idx} position={zone.position} name={zone.name} />
        ))}
      </MapView>

      <div style={{ marginTop: "20px" }}>
        {zones.map((zone, idx) => (
          <div key={idx} style={styles.card}>
            <h3>{zone.name}</h3>
            <p>{zone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
};

export default SafeZones;
