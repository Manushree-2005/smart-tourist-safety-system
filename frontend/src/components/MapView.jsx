// src/components/MapView.jsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Example danger zones (polygons)
const dangerZones = [
  [
    [28.7041, 77.1025],
    [28.7051, 77.1025],
    [28.7051, 77.1035],
    [28.7041, 77.1035],
  ],
  [
    [28.706, 77.104],
    [28.707, 77.104],
    [28.707, 77.105],
    [28.706, 77.105],
  ],
];

function MapView({ destination, userLocation }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const userMarkerRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map("map", { center: [28.7041, 77.1025], zoom: 14 });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(mapRef.current);

    // Add danger zones
    dangerZones.forEach((coords) => {
      L.polygon(coords, { color: "red", fillColor: "red", fillOpacity: 0.3 }).addTo(mapRef.current);
    });
  }, []);

  // Track user location marker
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    const loc = [userLocation.lat, userLocation.lng];

    if (!userMarkerRef.current) {
      userMarkerRef.current = L.marker(loc, { title: "You are here" }).addTo(mapRef.current);
      mapRef.current.setView(loc, 15);
    } else {
      userMarkerRef.current.setLatLng(loc);
    }

    // Update routing if destination is set
    if (routingRef.current && routingRef.current.getWaypoints().length === 2) {
      routingRef.current.setWaypoints([L.latLng(loc), routingRef.current.getWaypoints()[1].latLng]);
    }
  }, [userLocation]);

  // Initialize routing when destination changes
  useEffect(() => {
    if (!mapRef.current || !userLocation || !destination) return;

    // Remove existing route if present
    if (routingRef.current) {
      mapRef.current.removeControl(routingRef.current);
    }

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
      lineOptions: { styles: [{ color: "green", weight: 5 }] },
      createMarker: (i, wp) => (i === 0 ? userMarkerRef.current : L.marker(wp.latLng)),
      addWaypoints: false,
      routeWhileDragging: true,
      fitSelectedRoutes: true,
    }).addTo(mapRef.current);
  }, [destination, userLocation]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
}

export default MapView;
