import React from "react";

function EmergencyButton() {
  return (
    <button style={styles.button} onClick={() => alert("🚨 SOS Triggered!")}>
      🚨 EMERGENCY SOS
    </button>
  );
}

const styles = {
  button: {
    background: "#ff0033",
    color: "white",
    padding: "15px 30px",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    animation: "pulse 1.5s infinite",
    boxShadow: "0 4px 12px rgba(255,0,0,0.4)"
  }
};

// Add pulse animation globally
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
`);

export default EmergencyButton;
