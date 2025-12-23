import { useEffect } from "react";
import L from "leaflet";

export default function LiveLocationTracker({ map, onLocation }) {
  useEffect(() => {
    if (!map || !onLocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        onLocation(loc);
        map.setView([loc.lat, loc.lng], 12);

        L.marker([loc.lat, loc.lng])
          .addTo(map)
          .bindPopup("📍 You are here")
          .openPopup();
      },
      () => alert("Location permission denied"),
      { enableHighAccuracy: true }
    );
  }, [map, onLocation]);

  return null;
}
