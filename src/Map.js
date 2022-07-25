import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet'
import "./Map.css";
import { showDataOnMap } from "./util";


function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map" id="map">
    <MapContainer center={center} zoom={zoom} 
        style={{width: '50vw', height: "50vh"}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showDataOnMap(countries,casesType)}
    </MapContainer>
    </div>
  );
}

export default Map;