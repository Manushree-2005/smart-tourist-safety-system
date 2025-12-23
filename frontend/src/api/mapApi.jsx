export const getSafeZones = async () => {
  return [
    {
      id: 1,
      name: "Police Station",
      type: "police",
      description: "24/7 Police Assistance",
      lat: 12.9718,
      lng: 77.5937,
    },
    {
      id: 2,
      name: "Government Hospital",
      type: "hospital",
      description: "Emergency Medical Services",
      lat: 12.976,
      lng: 77.594,
    },
    {
      id: 3,
      name: "Fire Station",
      type: "fire",
      description: "Fire & Rescue Services",
      lat: 12.966,
      lng: 77.591,
    },
  ];
};
