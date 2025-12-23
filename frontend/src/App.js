import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Weather from "./pages/Weather";
import LiveAlerts from "./pages/LiveAlerts";
import EmergencyContacts from "./pages/EmergencyContacts";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/alerts" element={<LiveAlerts />} />
        <Route path="/emergency" element={<EmergencyContacts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
