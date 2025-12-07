import React from "react";
import SafeZoneMarker from "../components/SafeZoneMarker.jsx";

function SafeZones() {
  const zones = [
    { name: "Police Station", description: "24/7 emergency support" },
    { name: "Hospital", description: "Immediate medical help" },
    { name: "Tourist Help Center", description: "Support for travelers" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nearby Safe Zones</h2>

      {zones.map((z, index) => (
        <SafeZoneMarker key={index} zone={z} />
      ))}
    </div>
  );
}

export default SafeZones;
