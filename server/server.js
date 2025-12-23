import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- HELPER: FETCH NEARBY PLACES ---------- */
async function fetchNearby(lat, lng, type) {
  const query = `
    [out:json];
    (
      node["amenity"="${type}"](around:5000,${lat},${lng});
    );
    out body 10;
  `;

  const url = "https://overpass-api.de/api/interpreter";
  const res = await fetch(url, {
    method: "POST",
    body: query,
  });
  const data = await res.json();
  return data.elements || [];
}

/* ---------- PLAN TRIP API ---------- */
app.post("/api/plan-trip", async (req, res) => {
  try {
    const { from, to } = req.body;

    /* ---------- REAL ROAD ROUTE ---------- */
    const osrmURL = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false`;
    const routeRes = await fetch(osrmURL);
    const routeData = await routeRes.json();

    const distanceKm = routeData.routes[0].distance / 1000;
    const carHours = routeData.routes[0].duration / 3600;

    /* ---------- TRANSPORT TIME ---------- */
    const transport = {
      bike: (distanceKm / 40).toFixed(2),
      bus: (distanceKm / 35).toFixed(2),
      car: carHours.toFixed(2),
      train: (distanceKm / 80).toFixed(2),
      flight: (distanceKm / 600).toFixed(2),
    };

    /* ---------- FUEL COST ---------- */
    const fuel = {
      bike: `₹${(distanceKm * 2.2).toFixed(0)}`,   // avg
      car: `₹${(distanceKm * 6).toFixed(0)}`,
    };

    /* ---------- LIVE SAFETY DATA ---------- */
    const hospitals = await fetchNearby(to.lat, to.lng, "hospital");
    const police = await fetchNearby(to.lat, to.lng, "police");

    /* ---------- EMERGENCY CONTACTS ---------- */
    const emergency = {
      police: "112",
      ambulance: "108",
      women_helpline: "181",
      tourist_helpline: "1363",
    };

    res.json({
      distance_km: distanceKm.toFixed(1),
      transport_time_hours: transport,
      fuel_cost_estimate: fuel,
      nearby_hospitals: hospitals.map(h => h.tags?.name).filter(Boolean),
      nearby_police: police.map(p => p.tags?.name).filter(Boolean),
      emergency_contacts: emergency,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Trip planning failed" });
  }
});

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("✅ Smart Tourist Safety Server running on http://localhost:5000");
});
