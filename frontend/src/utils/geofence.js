import { calculateDistance } from "./locationHelper";

// Check if user is inside geofence
export const isInsideGeofence = (userLocation, zoneCenter, radiusMeters) => {
  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    zoneCenter.lat,
    zoneCenter.lng
  );
  return distance <= radiusMeters;
};

// Filter zones that user is inside
export const checkMultipleZones = (userLocation, zones) =>
  zones.filter(zone => isInsideGeofence(userLocation, zone.center, zone.radius));

// Check if destination is safe
export const getSafestRoute = (user, destination, dangerZones) => {
  const isDanger = (lat, lng) =>
    dangerZones.some(zone => calculateDistance(lat, lng, zone.lat, zone.lng) <= zone.radius);

  if (isDanger(destination.lat, destination.lng)) {
    return { blocked: true, message: "Destination is inside a danger zone!" };
  }

  return { blocked: false, user, destination };
};
