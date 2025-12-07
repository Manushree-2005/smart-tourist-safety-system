import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Smart Tourist Safety</h2>

      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/map" style={styles.link}>Safety Map</Link></li>
        <li><Link to="/alerts" style={styles.link}>Alerts</Link></li>
        <li><Link to="/safezones" style={styles.link}>Safe Zones</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#1e1e2f",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  },
  logo: {
    margin: 0,
    fontWeight: "bold"
  },
  menu: {
    display: "flex",
    gap: "25px",
    listStyle: "none",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
  }
};

export default Navbar;
