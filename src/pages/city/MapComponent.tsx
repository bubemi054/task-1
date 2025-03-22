"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  latitude: number;
  longitude: number;
};

export default function MapComponent({ latitude, longitude }: MapProps) {
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
}
