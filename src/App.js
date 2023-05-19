import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, {useEffect, useState } from 'react';
import L from 'leaflet';

function App() {

  const [trucks, setTrucks] = useState([]);
  const greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const yellowIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    fetch(`https://food-truck-map.onrender.com/food_trucks`)
      .then(response => response.json())
      .then(data => {
        setTrucks(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {/* <input id="search" 
        placeholder="Enter the restaurant name..."
        autoComplete="off">
      </input> */}
      <MapContainer style={{ height: "100vh", width: "100%" }} center={[37.773972, -122.431297]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trucks.map((truck, index) => {
          let markerIcon, name;
          if (truck.status === 'APPROVED') {
            markerIcon = greenIcon;
            name = "green";
          } else if (truck.status === 'REQUESTED') {
            markerIcon = yellowIcon;
            name = "yellow";
          } else {
            markerIcon = redIcon;
            name = "red";
          }
          
          return (
            <Marker position={[truck.location.latitude, truck.location.longitude]} icon={markerIcon}>
              <Popup>
                <span class="popup">{truck.applicant}</span> <br/>
                <span class="popup">Address: </span>{truck.address} <br/>
                <span class="popup">Status: </span><span class={name}>{truck.status}</span> <br/>
                <span class="popup">Menu: </span>{truck.food_items}
              </Popup>
            </Marker>
        )})}
        
      </MapContainer>
    </div>
    
  );
}

export default App;
