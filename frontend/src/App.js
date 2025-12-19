import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Alerts from "./pages/Alerts";
import MapPage from "./pages/MapPage";
import SafeZones from "./pages/SafeZones";
import Weather from "./pages/Weather";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/safezones" element={<SafeZones />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
