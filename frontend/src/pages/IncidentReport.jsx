import { useState } from "react";

function IncidentReport() {
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location permission denied")
    );
  };

  const submitIncident = () => {
    if (!incidentType || !description || !location) {
      alert("Fill all fields");
      return;
    }

    const incident = {
      id: Date.now(),
      incidentType,
      description,
      location,
      time: new Date().toLocaleString(),
      status: "REPORTED",
    };

    const existing =
      JSON.parse(localStorage.getItem("incidents")) || [];
    existing.push(incident);
    localStorage.setItem("incidents", JSON.stringify(existing));

    alert("Incident reported successfully");

    setIncidentType("");
    setDescription("");
    setLocation(null);
  };

  return (
    <div style={{ padding: "30px", color: "black" }}>
      <h2>Report an Incident</h2>

      <select
        value={incidentType}
        onChange={(e) => setIncidentType(e.target.value)}
      >
        <option value="">Select Incident Type</option>
        <option value="Accident">Accident</option>
        <option value="Theft">Theft</option>
        <option value="Medical">Medical Emergency</option>
      </select>

      <br /><br />

      <textarea
        placeholder="Describe the incident"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={getLocation}>Get Current Location</button>

      {location && (
        <p>
          Location: {location.lat}, {location.lng}
        </p>
      )}

      <br />

      <button onClick={submitIncident}>
        Submit Incident
      </button>
    </div>
  );
}

export default IncidentReport;
