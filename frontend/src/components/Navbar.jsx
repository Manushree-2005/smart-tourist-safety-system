import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={nav}>
      <h2>🧭 Smart Tourist Safety</h2>

      <div style={links}>
        <Link to="/" style={link}>Home</Link>
        <Link to="/map" style={link}>Plan Trip</Link>
        <Link to="/weather" style={link}>Weather</Link>
        <Link to="/alerts" style={link}>Alerts</Link>
        <Link to="/emergency" style={link}>Emergency</Link>
      </div>
    </nav>
  );
}

const nav = {
  padding: "15px 25px",
  background: "#0077cc",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const links = {
  display: "flex",
  gap: "18px",
};

const link = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};
