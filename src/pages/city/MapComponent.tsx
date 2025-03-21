"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={12}
      style={{ width: "571px", height: "297px", borderRadius: "15px" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
};

export default MapComponent;
