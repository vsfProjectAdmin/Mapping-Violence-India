import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import markerIcon from '../images/marker.png';
import '../css/Map.css';

const Map = ({ incidents }) => {
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [15, 15], // Adjust if needed
  });

  return (
    <div className='map-container items-center flex justify-center'>
      <MapContainer center={[20.5937, 78.9629]} maxBounds={[[6.75, 68.1],[37.1, 97.4]]} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {incidents.map((incident, index) => ( 
          <Marker
            key={index}
            position={[incident.INCI_LATITUDE, incident.INCI_LONGITUDE]}
            icon={customIcon}
          >
            <Popup>
              <b>{incident.INCI_NAME}</b><br />
              {incident.INCI_CATEGORY}<br />
              {incident.INCI_PLACE_CITY_DISTRICT}, {incident.INCI_STATE_UT}<br />
              Date: {new Date(incident.INCI_DATE).toLocaleDateString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
