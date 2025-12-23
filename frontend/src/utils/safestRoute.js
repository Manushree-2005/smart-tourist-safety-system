export function getSafestRoute(user, destination, dangerZones) {
  const isDanger = (lat, lng) => {
    return dangerZones.some((zone) => {
      const dx = lat - zone.lat;
      const dy = lng - zone.lng;
      return Math.sqrt(dx * dx + dy * dy) < zone.radius;
    });
  };

  if (!user || !destination) return null;

  if (isDanger(destination.lat, destination.lng)) {
    return {
      blocked: true,
      message: "Destination is inside a danger zone!",
    };
  }

  return {
    blocked: false,
    path: [user, destination],
  };
}
