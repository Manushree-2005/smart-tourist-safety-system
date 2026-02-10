import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import SafeZones from "./pages/SafeZones";
import IncidentReport from "./pages/IncidentReport";

import Weather from "./pages/Weather";


export default function App() {
  return (
    <Router>
      <div style={{ background: "#f7f9fc", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ padding: "20px", minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/safezones" element={<SafeZones />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/incident-report" element={<IncidentReport />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
