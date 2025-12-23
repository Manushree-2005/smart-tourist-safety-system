export default function SOSButton({ location }) {
  const sendSOS = () => {
    const msg = `🚨 SOS!
I need help.
https://www.google.com/maps?q=${location.lat},${location.lng}`;

    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`
    );
  };

  return (
    <button onClick={sendSOS} style={btn}>
      🚨 EMERGENCY SOS
    </button>
  );
}

const btn = {
  position: "absolute",
  bottom: 20,
  right: 20,
  padding: 15,
  background: "red",
  color: "#fff",
};
