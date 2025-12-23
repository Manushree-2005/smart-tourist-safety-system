import { useState, useRef } from "react";
import L from "leaflet";

export default function PlaceSearch({ map, onSelect }) {
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const timer = useRef(null);

  const search = (value) => {
    setText(value);
    if (!map) return;

    if (timer.current) clearTimeout(timer.current);
    if (value.length < 3) {
      setResults([]);
      return;
    }

    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=6`,
          {
            headers: {
              "User-Agent": "SmartTouristSafety/1.0",
              "Accept": "application/json",
            },
          }
        );
        const data = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      }
    }, 600);
  };

  const selectPlace = (p) => {
    if (!map) return;

    const loc = { lat: +p.lat, lng: +p.lon };
    onSelect(loc);
    map.setView([loc.lat, loc.lng], 10);

    L.marker([loc.lat, loc.lng])
      .addTo(map)
      .bindPopup(p.display_name)
      .openPopup();

    setResults([]);
    setText(p.display_name);
  };

  return (
    <div style={box}>
      <input
        value={text}
        onChange={(e) => search(e.target.value)}
        placeholder="Where do you want to go?"
        style={{ width: "100%" }}
      />
      {results.map((p, i) => (
        <div key={i} onClick={() => selectPlace(p)} style={item}>
          {p.display_name}
        </div>
      ))}
    </div>
  );
}

const box = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "#fff",
  padding: 10,
  width: 300,
  zIndex: 1000,
};

const item = {
  padding: 6,
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
};
