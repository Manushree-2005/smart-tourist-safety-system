import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={nav}>
      <h2>🧭 Smart Tourist Safety</h2>

      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/map" style={styles.link}>Safety Map</Link></li>
        <li><Link to="/alerts" style={styles.link}>Alerts</Link></li>
        <li><Link to="/safezones" style={styles.link}>Safe Zones</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/weather">Weather</Link></li>
      </ul>
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
