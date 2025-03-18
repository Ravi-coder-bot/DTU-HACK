"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 4rem)", // Adjust height to account for navbar
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const hardcodedLocation = { lat: 28.7499, lng: 77.1170 }; // DTU Location
const hardcodedHospitals = [
  { name: "Max Super Speciality Hospital, Shalimar Bagh", location: { lat: 28.7163, lng: 77.1664 } },
  { name: "Maharaja Agrasen Hospital, Punjabi Bagh", location: { lat: 28.6753, lng: 77.1326 } },
  { name: "Jaipur Golden Hospital, Rohini", location: { lat: 28.6881, lng: 77.1118 } },
];

const greenIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [41, 41],
});

const NearbyHospitals = () => {
  const [map, setMap] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [routeLayer, setRouteLayer] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  useEffect(() => {
    const mapInstance = L.map("map", {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([hardcodedLocation.lat, hardcodedLocation.lng], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);

    L.marker([hardcodedLocation.lat, hardcodedLocation.lng], { icon: greenIcon })
      .addTo(mapInstance)
      .bindPopup("Delhi Technological University (DTU)")
      .openPopup();

    hardcodedHospitals.forEach((hospital) => {
      const marker = L.marker([hospital.location.lat, hospital.location.lng], { icon: redIcon })
        .addTo(mapInstance)
        .bindPopup(hospital.name);
      marker.on("mouseover", () => setSelectedHospital(hospital));
      marker.on("mouseout", () => setSelectedHospital(null));
      marker.on("click", () => getRoute(mapInstance, hospital.location, hospital.name));
    });

    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  const getRoute = async (mapInstance, destination, hospitalName) => {
    if (routeLayer) {
      mapInstance.removeLayer(routeLayer);
    }

    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${hardcodedLocation.lng},${hardcodedLocation.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
    try {
      const response = await fetch(routeUrl);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const routeCoords = data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
        const routePolyline = L.polyline(routeCoords, { color: "#00FFFF", weight: 4 }).addTo(mapInstance);
        mapInstance.fitBounds(routePolyline.getBounds());
        setRouteLayer(routePolyline);

        const duration = Math.round(data.routes[0].duration / 60);
        setTravelTime({ hospital: hospitalName, time: `${duration} min` });
      } else {
        console.error("No routes found:", data);
        setTravelTime({ hospital: hospitalName, time: "Route unavailable" });
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      setTravelTime({ hospital: hospitalName, time: "Error calculating route" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">AI Insights - Nearby Hospitals</h1>
      <div className="relative">
        <div id="map" style={containerStyle}></div>
        {selectedHospital && (
          <div className="absolute top-4 left-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-[1000]">
            <h3 className="text-lg font-semibold">{selectedHospital.name}</h3>
          </div>
        )}
        {travelTime && (
          <div className="absolute top-16 left-4 bg-gray-800 text-cyan-300 p-3 rounded-lg shadow-lg z-[1000]">
            <h4 className="text-md font-medium">
              To {travelTime.hospital}: {travelTime.time}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitals;