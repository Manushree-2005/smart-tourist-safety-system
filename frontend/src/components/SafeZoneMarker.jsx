import { useEffect } from "react";
import L from "leaflet";

export default function SafeZoneMarker({ position, name, map }) {
  useEffect(() => {
    if (!map || !position) return;

    const marker = L.marker([position.lat, position.lng]).addTo(map);
    marker.bindPopup(name);

    return () => map.removeLayer(marker);
  }, [map, position, name]);

  return null;
}
