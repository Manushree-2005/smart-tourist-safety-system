import React from "react";

function MapView() {
  return (
    <div style={styles.mapContainer}>
      <span style={styles.text}>🗺️ Map View Placeholder</span>
    </div>
  );
}

const styles = {
  mapContainer: {
    height: "350px",
    borderRadius: "18px",
    border: "2px dashed #8ab6ff",
    background: "#e8f1ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  text: {
    color: "#003f88",
    fontSize: "20px",
    fontWeight: "bold",
  }
};

export default MapView;
