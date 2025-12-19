import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2025 Smart Tourist Safety. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: { textAlign: "center", padding: "15px", backgroundColor: "#0077cc", color: "#fff", position: "fixed", width: "100%", bottom: 0 }
};

export default Footer;
