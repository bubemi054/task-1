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




// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// interface MapProps {
//   latitude: number;
//   longitude: number;
// }

// const containerStyle = {
//   width: "100%",
//   height: "300px",
//   borderRadius: "15px",
// };

// const MapComponent: React.FC<MapProps> = ({ latitude, longitude }) => {
//   const center = { lat: latitude, lng: longitude };

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
