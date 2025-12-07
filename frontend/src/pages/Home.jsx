import React from "react";
import EmergencyButton from "../components/EmergencyButton";
import TouristAlertCard from "../components/TouristAlertCard";
import MapView from "../components/MapView";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to Smart Tourist Safety System</h2>
      <p>Your all-in-one digital safety companion while traveling.</p>

      <MapView />

      <h3 style={{ marginTop: "40px" }}>Latest Alerts</h3>

      <TouristAlertCard
        title="High Crowd Detected"
        description="Crowd detected at Central Mall."
        level="high"
      />

      <TouristAlertCard
        title="Weather Warning"
        description="Rain expected in 45 minutes."
        level="medium"
      />

      <div style={{ marginTop: "25px" }}>
        <EmergencyButton />
      </div>
    </div>
  );
}

export default Home;
