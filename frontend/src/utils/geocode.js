export async function geocodePlace(place) {
  if (!place) return null;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    place
  )}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "SmartTouristSafetyApp",
    },
  });

  const data = await res.json();

  if (!data || data.length === 0) {
    return null;
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    displayName: data[0].display_name,
  };
}
