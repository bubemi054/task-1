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
      className="h-[297px] w-[571px] rounded-[15px] [@media(max-width:1050px)]:w-[50%] [@media(max-width:550px)]:w-[100%]"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
}
