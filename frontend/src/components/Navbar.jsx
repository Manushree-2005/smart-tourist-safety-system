import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Smart Tourist Safety</h2>
      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/map" style={styles.link}>Safety Map</Link></li>
        <li><Link to="/safezones" style={styles.link}>Safe Zones</Link></li>
        <li><Link to="/alerts" style={styles.link}>Alerts</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/weather">Weather</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#0077cc", color: "#fff" },
  logo: { margin: 0 },
  menu: { listStyle: "none", display: "flex", gap: "20px", margin: 0 },
  link: { color: "#fff", textDecoration: "none" },
};

export default Navbar;
