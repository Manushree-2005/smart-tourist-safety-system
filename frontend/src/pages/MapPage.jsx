// src/pages/MapPage.jsx
import React from "react";
import MapView from "../components/MapView.jsx";

function MapPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Safety Map</h2>
      <p>View your current location and real-time safety updates on the map.</p>

      <MapView />
    </div>
  );
}

export default MapPage;
