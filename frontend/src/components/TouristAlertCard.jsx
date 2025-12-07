import React from "react";

function TouristAlertCard({ title, description, level }) {
  const color = {
    high: "#ff4d4d",
    medium: "#ffc107",
    low: "#28a745"
  }[level];

  const bg = {
    high: "#ffe5e5",
    medium: "#fff5cc",
    low: "#e6ffe6"
  }[level];

  return (
    <div style={{ ...styles.card, background: bg, borderLeft: `8px solid ${color}` }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p>{description}</p>
      <strong style={{ color }}>Risk Level: {level.toUpperCase()}</strong>
    </div>
  );
}

const styles = {
  card: {
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }
};

export default TouristAlertCard;
