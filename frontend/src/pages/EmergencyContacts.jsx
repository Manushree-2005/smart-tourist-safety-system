function EmergencyContacts() {
  const callNumber = (number) => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = `tel:${number}`;
    } else {
      alert(
        `📞 This feature works on mobile phones only.\n\nPlease dial manually: ${number}`
      );
    }
  };

  const contacts = [
    { name: "Police", number: "112" },
    { name: "Ambulance", number: "108" },
    { name: "Fire", number: "101" },
    { name: "Tourist Helpline", number: "1363" },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>🚨 Emergency Contacts</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {contacts.map((c, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "20px",
              width: "220px",
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{c.name}</h3>
            <p>{c.number}</p>
            <button
              onClick={() => callNumber(c.number)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              📞 Call Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmergencyContacts;
