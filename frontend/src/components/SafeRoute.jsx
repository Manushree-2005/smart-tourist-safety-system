import { useEffect, useRef } from "react";
import L from "leaflet";

export default function SafeRoute({ map, start, end }) {
  const routeRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    // Remove previous route
    if (routeRef.current) map.removeLayer(routeRef.current);

    // Draw polyline (simple straight line, can be upgraded with routing API)
    const route = L.polyline(
      [
        [start.lat, start.lng],
        [end.lat, end.lng],
      ],
      { color: "green", weight: 4, dashArray: "5,10" }
    ).addTo(map);

    routeRef.current = route;

    // Fit bounds
    map.fitBounds(route.getBounds(), { padding: [50, 50] });

    return () => {
      if (routeRef.current) map.removeLayer(routeRef.current);
    };
  }, [map, start, end]);

  return null;
}
