import {MapContainer,TileLayer,Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import markerIcon from "/location-pin.png";


import { useState } from "react";

function Map() {
  const [mapPosition,setMapPosition] = useState([40,0]);

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // The point of the icon that corresponds to the marker's location
    popupAnchor: [0, -32], // The point from which the popup should open relative to the iconAnchor
  });
 return (
   
    <MapContainer center={[51.505, -0.09]} zoom={7}
    className="map"
    scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]} icon={customIcon} className="marker">
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
 
  )
}

export default Map;