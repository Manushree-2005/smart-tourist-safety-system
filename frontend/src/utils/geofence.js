// utils/geofence.jsx

export function isInsideGeofence(userLocation, zoneCenter, radiusMeters) {
  const R = 6371e3; // radius of Earth in meters

  const lat1 = (userLocation.lat * Math.PI) / 180;
  const lat2 = (zoneCenter.lat * Math.PI) / 180;

  const deltaLat = ((zoneCenter.lat - userLocation.lat) * Math.PI) / 180;
  const deltaLng = ((zoneCenter.lng - userLocation.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance <= radiusMeters;
}

export function checkMultipleZones(userLocation, zones) {
  return zones.filter(zone =>
    isInsideGeofence(userLocation, zone.center, zone.radius)
  );
}
