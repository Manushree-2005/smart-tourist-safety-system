import { useEffect } from "react";
import L from "leaflet";

export default function RoutePlanner({ map, start, end, onInfo }) {
  useEffect(() => {
    if (!map || !start || !end || !onInfo) return;

    async function fetchRoute() {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      const route = data.routes[0];
      const path = route.geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
      );

      L.polyline(path, { color: "blue", weight: 5 }).addTo(map);
      map.fitBounds(path);

      onInfo({
        distance: (route.distance / 1000).toFixed(1),
        time: (route.duration / 3600).toFixed(2),
      });
    }

    fetchRoute();
  }, [map, start, end, onInfo]);

  return null;
}
