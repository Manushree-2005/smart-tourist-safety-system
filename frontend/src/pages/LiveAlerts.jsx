import { useEffect, useState } from "react";

function LiveAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const baseAlerts = [
      {
        id: 1,
        title: "Heavy Rain Alert",
        message: "Avoid traveling in low-lying areas.",
        level: "high",
        time: "Just now",
      },
      {
        id: 2,
        title: "Road Block",
        message: "Road closed near City Center.",
        level: "medium",
        time: "10 mins ago",
      },
      {
        id: 3,
        title: "Safety Advisory",
        message: "Crowded area reported near bus stand.",
        level: "info",
        time: "30 mins ago",
      },
    ];

    setAlerts(baseAlerts);

    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        title: "New Safety Update",
        message: "Police patrol increased in tourist area.",
        level: "info",
        time: "Just now",
      };

      setAlerts((prev) => [newAlert, ...prev]);
    }, 15000);

    return () => clearInterval(interval);
  }, []); // ✅ No warning now

  const getColor = (level) => {
    if (level === "high") return "#e74c3c";
    if (level === "medium") return "#f39c12";
    return "#3498db";
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🚨 Live Alerts</h2>
      <p style={{ color: "#555" }}>
        Real-time safety updates for tourists
      </p>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            background: getColor(alert.level),
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "15px",
            animation: "fadeIn 0.5s ease",
          }}
        >
          <h3>⚠ {alert.title}</h3>
          <p>{alert.message}</p>
          <small>{alert.time}</small>
        </div>
      ))}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default LiveAlerts;
