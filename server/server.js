const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Demo danger zone API
app.get("/danger-zones", (req, res) => {
  res.json([
    { lat: 26.1445, lng: 91.7362, level: "high", message: "Crowded Area" },
    { lat: 26.15, lng: 91.74, level: "medium", message: "Pickpocket Warning" },
    { lat: 26.13, lng: 91.73, level: "safe", message: "Tourist Friendly" }
  ]);
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
