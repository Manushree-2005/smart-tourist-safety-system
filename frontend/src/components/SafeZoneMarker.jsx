import React from "react";

export default function SafeZoneMarker({ zone }) {
  return (
    <div
      style={{
        background: "#e4ffe5",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
        borderLeft: "5px solid #2ecc71",
      }}
    >
      <h3 style={{ margin: 0 }}>{zone.name}</h3>
      <p style={{ margin: 0 }}>{zone.description}</p>
    </div>
  );
}
