import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WeatherDashboard from "./components/WeatherDashboard";
import Weather from "./pages/Weather";

import Home from "./pages/Home";
import About from "./pages/About";
import Alerts from "./pages/Alerts";
import MapPage from "./pages/MapPage";
import SafeZones from "./pages/SafeZones";

function App() {
  return (
    <Router>
      <div style={{ background: "#f7f9fc", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ padding: "20px", minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/safezones" element={<SafeZones />} />
            <Route path="/weather" element={<Weather />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
