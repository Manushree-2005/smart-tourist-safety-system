// utils/apiClient.jsx

const API_BASE_URL = "http://localhost:5000/api"; // your backend URL

export async function apiGet(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    return await res.json();
  } catch (error) {
    console.error("GET API Error:", error);
    return null;
  }
}

export async function apiPost(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.error("POST API Error:", error);
    return null;
  }
}
