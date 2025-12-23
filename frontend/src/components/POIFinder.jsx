import { useEffect } from "react";
import L from "leaflet";

export default function POIFinder({ map, center }) {
  useEffect(() => {
    async function fetchPOI(type, icon) {
      const q = `
        [out:json];
        node(around:5000,${center.lat},${center.lng})[amenity=${type}];
        out;
      `;
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: q,
      });
      const data = await res.json();

      data.elements.forEach((p) => {
        L.marker([p.lat, p.lon]).addTo(map).bindPopup(type);
      });
    }

    fetchPOI("hospital");
    fetchPOI("police");
    fetchPOI("restaurant");
    fetchPOI("hotel");
  }, [map, center]);

  return null;
}
