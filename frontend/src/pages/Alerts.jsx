import React from "react";
import TouristAlertCard from "../components/TouristAlertCard";

function Alerts() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Safety Alerts</h2>
      <p>Here are the latest safety updates in your area.</p>

      <TouristAlertCard
        title="Road Blocked"
        description="A road accident has caused traffic blockage on Park Street."
        level="high"
      />

      <TouristAlertCard
        title="Low Visibility"
        description="Fog has reduced visibility in the morning hours."
        level="medium"
      />

      <TouristAlertCard
        title="All Clear"
        description="Everything is normal around your location."
        level="low"
      />
    </div>
  );
}

export default Alerts;
