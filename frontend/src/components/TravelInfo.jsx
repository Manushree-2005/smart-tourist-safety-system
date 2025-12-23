import React from "react";

export default function TravelInfo({ info }) {
  if (!info) return null;

  return (
    <div style={panelStyle}>
      <h3>🧭 Trip Summary</h3>
      <p>📍 Distance: <b>{info.distance} km</b></p>
      <p>⏱ Estimated Time: <b>{info.time} hours</b></p>

      <p>🚗 Bike / Car: {info.time} hrs</p>
      <p>🚌 Bus: {(info.time * 1.2).toFixed(2)} hrs</p>
      <p>🚆 Train: {(info.time * 0.7).toFixed(2)} hrs</p>
      <p>✈ Flight: {(info.distance / 700).toFixed(2)} hrs</p>
    </div>
  );
}

const panelStyle = {
  position: "absolute",
  bottom: 20,
  left: 20,
  background: "#ffffff",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
  zIndex: 1000,
};
