import React from "react";

function SOSButton({ onSOS }) {
  return (
    <button
      onClick={onSOS}
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "red",
        color: "white",
        fontSize: "20px",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        border: "none",
        boxShadow: "0px 0px 15px rgba(255,0,0,0.8)",
        animation: "pulse 1s infinite",
      }}
    >
      SOS
    </button>
  );
}

export default SOSButton;
