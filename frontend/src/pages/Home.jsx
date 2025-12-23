import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      {/* HERO SECTION */}
      <section style={hero}>
        <div style={heroContent}>
          <h1 style={title}>
            Travel Smart. <br /> Travel Safe.
          </h1>

          <p style={subtitle}>
            Smart Tourist Safety System helps you plan safe routes,
            check real-time weather, and explore confidently.
          </p>

          <div style={btnGroup}>
            <button style={primaryBtn} onClick={() => navigate("/map")}>
              🗺️ Plan Trip
            </button>

            <button style={secondaryBtn} onClick={() => navigate("/weather")}>
              🌤️ Check Weather
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={features}>
        <div style={card}>
          <h3>🛡️ Safe Routes</h3>
          <p>Find safer travel paths and zones instantly.</p>
        </div>

        <div style={card}>
          <h3>🌦️ Weather Updates</h3>
          <p>Live weather information before you travel.</p>
        </div>

        <div style={card}>
          <h3>📍 Smart Navigation</h3>
          <p>Plan trips with confidence and awareness.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;

/* ---------- STYLES ---------- */

const container = {
  fontFamily: "Arial, sans-serif",
};

const hero = {
  background: "linear-gradient(135deg, #0077cc, #00aaff)",
  color: "#fff",
  padding: "80px 20px",
};

const heroContent = {
  maxWidth: "900px",
  margin: "auto",
};

const title = {
  fontSize: "48px",
  marginBottom: "20px",
};

const subtitle = {
  fontSize: "18px",
  lineHeight: "1.6",
  maxWidth: "600px",
};

const btnGroup = {
  marginTop: "30px",
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "12px 25px",
  fontSize: "16px",
  background: "#fff",
  color: "#0077cc",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const secondaryBtn = {
  padding: "12px 25px",
  fontSize: "16px",
  background: "transparent",
  color: "#fff",
  border: "2px solid #fff",
  borderRadius: "6px",
  cursor: "pointer",
};

const features = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: "50px 20px",
  maxWidth: "1000px",
  margin: "auto",
};

const card = {
  background: "#f9f9f9",
  padding: "25px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
