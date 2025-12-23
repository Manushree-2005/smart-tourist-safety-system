// src/pages/MapPage.jsx
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

/* ---------- ICONS ---------- */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [28, 28],
});

const policeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991108.png",
  iconSize: [28, 28],
});

const trafficIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [25, 25],
});

const weatherIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
  iconSize: [25, 25],
});

const historicalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
  iconSize: [28, 28],
});

/* ---------- AUTO FIT MAP BOUNDS ---------- */
function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) map.fitBounds(points);
  }, [points, map]);
  return null;
}

/* ---------- HISTORICAL PLACES DATA ---------- */
const allHistoricalPlaces = [
  { name: "Red Fort", lat: 28.6562, lng: 77.2410 },
  { name: "Qutub Minar", lat: 28.5244, lng: 77.1855 },
  { name: "India Gate", lat: 28.6129, lng: 77.2295 },
  { name: "Charminar", lat: 17.3616, lng: 78.4747 },
  { name: "Golconda Fort", lat: 17.3835, lng: 78.4011 },
  { name: "Gateway of India", lat: 18.9220, lng: 72.8347 },
  { name: "Ajanta Caves", lat: 20.5522, lng: 75.7033 },
  { name: "Ellora Caves", lat: 20.0250, lng: 75.1790 },
  { name: "Jaipur City Palace", lat: 26.9270, lng: 75.8236 },
  { name: "Hawa Mahal", lat: 26.9239, lng: 75.8267 },
  { name: "Mysore Palace", lat: 12.3051, lng: 76.6551 },
  { name: "Cubbon Park", lat: 12.9763, lng: 77.5920 },
];

/* ---------- FUNCTION TO FIND HISTORICAL PLACES NEAR ROUTE ---------- */
const getNearbyHistoricalPlaces = (routeCoords, radiusKm = 15) => {
  const nearby = [];
  const kmDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  routeCoords.forEach(([lat, lng]) => {
    allHistoricalPlaces.forEach((place) => {
      if (!nearby.some((p) => p.name === place.name)) {
        const dist = kmDistance(lat, lng, place.lat, place.lng);
        if (dist <= radiusKm) nearby.push(place);
      }
    });
  });

  return nearby;
};

/* ---------- MAIN COMPONENT ---------- */
export default function MapPage() {
  const [current, setCurrent] = useState(null);
  const [place, setPlace] = useState("");
  const [route, setRoute] = useState([]);
  const [destination, setDestination] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [transportTimes, setTransportTimes] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [police, setPolice] = useState([]);
  const [trafficAlerts, setTrafficAlerts] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [historicalPlaces, setHistoricalPlaces] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [history, setHistory] = useState([]);

  /* ---------- LIVE LOCATION ---------- */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCurrent({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert("Please allow location access")
    );
  }, []);

  /* ---------- PLAN TRIP USING OSRM ---------- */
  const planTrip = async () => {
    if (!current) return alert("Waiting for current location...");
    if (!place) return alert("Enter destination");

    setShowInfo(false);
    setHospitals([]);
    setPolice([]);
    setTrafficAlerts([]);
    setWeatherAlerts([]);
    setHistoricalPlaces([]);

    try {
      // 1️⃣ GEOCODE destination using Nominatim
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}`,
        { headers: { "User-Agent": "smart-tourist-safety" } }
      );
      const data = await res.json();
      if (!data.length) return alert("Place not found");

      const dest = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      setDestination(dest);

      // 2️⃣ Fetch route from OSRM (driving)
      const osrmRes = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${current.lng},${current.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`
      );
      const osrmData = await osrmRes.json();
      if (!osrmData.routes || !osrmData.routes.length) return alert("Route not found");

      const routeCoords = osrmData.routes[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
      );
      setRoute(routeCoords);

      // 3️⃣ Distance from OSRM (in km)
      const km = osrmData.routes[0].distance / 1000;
      setDistanceKm(km.toFixed(1));

      // 4️⃣ Transport times
      setTransportTimes({
        bike: (km / 15).toFixed(1), // slower than car
        bus: (km / 35).toFixed(1),
        car: (km / 60).toFixed(1),
        train: (km / 80).toFixed(1),
        flight: (km / 600).toFixed(1),
      });

      // 5️⃣ POIs along route
      setHospitals([
        { lat: routeCoords[Math.floor(routeCoords.length / 3)][0], lng: routeCoords[Math.floor(routeCoords.length / 3)][1] },
        { lat: routeCoords[Math.floor((2 * routeCoords.length) / 3)][0], lng: routeCoords[Math.floor((2 * routeCoords.length) / 3)][1] },
      ]);
      setPolice([
        { lat: routeCoords[Math.floor(routeCoords.length / 4)][0], lng: routeCoords[Math.floor(routeCoords.length / 4)][1] },
        { lat: routeCoords[Math.floor((3 * routeCoords.length) / 4)][0], lng: routeCoords[Math.floor((3 * routeCoords.length) / 4)][1] },
      ]);
      setTrafficAlerts([{ lat: routeCoords[Math.floor(routeCoords.length / 2)][0], lng: routeCoords[Math.floor(routeCoords.length / 2)][1], severity: "Moderate congestion" }]);
      setWeatherAlerts([{ lat: routeCoords[Math.floor(routeCoords.length / 2)][0], lng: routeCoords[Math.floor(routeCoords.length / 2)][1], type: "Rain ahead" }]);

      const nearbyHistorical = getNearbyHistoricalPlaces(routeCoords, 15);
      setHistoricalPlaces(nearbyHistorical);

      // 6️⃣ Save recent trips
      const newTrip = { dest, km: km.toFixed(1), date: new Date().toLocaleString() };
      setHistory([newTrip, ...history].slice(0, 5));

      setShowInfo(true);
    } catch (err) {
      console.error(err);
      alert("Error planning trip. Try again.");
    }
  };

  const fuelCost = distanceKm ? (distanceKm / 15) * 100 : 0;
  const busFare = distanceKm ? distanceKm * 3 : 0;
  const flightFare = distanceKm ? distanceKm * 2.5 : 0;

  return (
    <div>
      <div style={header}>
        <h2>🧭 Advanced Trip Planner</h2>
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter destination"
          style={input}
        />
        <button onClick={planTrip} style={btn}>Plan Trip</button>
      </div>

      {current && (
        <MapContainer center={[current.lat, current.lng]} zoom={7} style={{ height: "65vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[current.lat, current.lng]}>
            <Popup>📍 You are here</Popup>
          </Marker>

          {destination && (
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>🏁 {place}</Popup>
            </Marker>
          )}

          {route.length > 0 && (
            <>
              <FitBounds points={route} />
              <Polyline positions={route} color="blue" />
            </>
          )}

          {hospitals.map((h, i) => (
            <Marker key={i} position={[h.lat, h.lng]} icon={hospitalIcon}>
              <Popup>🏥 Hospital</Popup>
            </Marker>
          ))}

          {police.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lng]} icon={policeIcon}>
              <Popup>🚓 Police Station</Popup>
            </Marker>
          ))}

          {trafficAlerts.map((t, i) => (
            <Marker key={i} position={[t.lat, t.lng]} icon={trafficIcon}>
              <Popup>⚠ {t.severity}</Popup>
            </Marker>
          ))}

          {weatherAlerts.map((w, i) => (
            <Marker key={i} position={[w.lat, w.lng]} icon={weatherIcon}>
              <Popup>🌧 {w.type}</Popup>
            </Marker>
          ))}

          {historicalPlaces.map((h, i) => (
            <Marker key={i} position={[h.lat, h.lng]} icon={historicalIcon}>
              <Popup>🏛 {h.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {showInfo && (
        <div style={info}>
          <h3>🧳 Trip Details</h3>
          <p><b>📏 Distance:</b> {distanceKm} km</p>

          <h4>⏱ Estimated Time by Transport</h4>
          <ul>
            <li>🏍 Bike: {transportTimes.bike} hrs</li>
            <li>🚌 Bus: {transportTimes.bus} hrs</li>
            <li>🚗 Car: {transportTimes.car} hrs</li>
            <li>🚆 Train: {transportTimes.train} hrs</li>
            <li>✈ Flight: {transportTimes.flight} hrs</li>
          </ul>

          <h4>💰 Trip Cost Estimate</h4>
          <ul>
            <li>⛽ Fuel (Car/Bike): Rs {fuelCost.toFixed(0)}</li>
            <li>🚌 Bus Fare: Rs {busFare.toFixed(0)}</li>
            <li>✈ Flight Ticket: Rs {flightFare.toFixed(0)}</li>
          </ul>

          <h4>🛡 Safety & Nearby Services</h4>
          <p>🏥 Hospitals found: {hospitals.length}</p>
          <p>🚓 Police stations found: {police.length}</p>
          <p>⚠ Traffic alerts: {trafficAlerts.length}</p>
          <p>🌧 Weather alerts: {weatherAlerts.length}</p>

          <h4>🏛 Historical Places Along Route</h4>
          <ul>{historicalPlaces.map((h, i) => <li key={i}>{h.name}</li>)}</ul>

          <h4>🗂 Recent Trips</h4>
          <ul>{history.map((h, i) => <li key={i}>{h.date} → Distance: {h.km} km</li>)}</ul>

          <button
            style={sos}
            onClick={() =>
              window.open(`https://www.google.com/maps/dir/${current.lat},${current.lng}/${destination.lat},${destination.lng}`)
            }
          >
            🚨 Share / Emergency SOS
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const header = { background: "#0077cc", color: "#fff", padding: 15 };
const input = { padding: 8, width: 260, marginRight: 10 };
const btn = { padding: "8px 15px", cursor: "pointer" };
const info = { padding: 15, background: "#f2f2f2" };
const sos = { background: "red", color: "white", padding: 10, border: "none", marginTop: 10, cursor: "pointer" };
