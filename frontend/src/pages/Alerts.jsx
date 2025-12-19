import React from "react";
import TouristAlertCard from "../components/TouristAlertCard";

function Alerts() {
  const alerts = [
    { title: "High Crime Area", description: "Avoid this area due to recent incidents.", level: "high", time: "10:00 AM" },
    { title: "Road Blocked", description: "Traffic blocked on Park Street.", level: "high", time: "09:30 AM" },
    { title: "Low Visibility", description: "Fog has reduced visibility.", level: "medium", time: "08:00 AM" },
    { title: "All Clear", description: "Everything is normal.", level: "low", time: "07:30 AM" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Safety Alerts</h1>
      <p>Latest safety updates in your area:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
        {alerts.map((alert, i) => <TouristAlertCard key={i} alert={alert} />)}
      </div>
    </div>
  );
}

export default Alerts;
