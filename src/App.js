import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, {useEffect, useState } from 'react';

function App() {

  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/food_trucks`)
      .then(response => response.json())
      .then(data => {
        setTrucks(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <input id="search" 
        placeholder="Enter the restaurant name..."
        autoComplete="off">
      </input>
      <MapContainer style={{ height: "100vh", width: "100%" }} center={[37.773972, -122.431297]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trucks.map((truck, index) => (
          <Marker position={[truck.location.latitude, truck.location.longitude]}>
            <Popup>
              <span class="popup">{truck.applicant}</span> <br/>
              <span class="popup">Address: </span>{truck.address} <br/>
              <span class="popup">Menu: </span>{truck.food_items}
            </Popup>
          </Marker>
        ))}
        
      </MapContainer>
    </div>
    
  );
}

export default App;
