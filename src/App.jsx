import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");

      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=0ed7b51a1b4848a6ac653705262502&q=${city.trim()}`
      );

      setData(res.data);
    } catch (err) {
      console.log(err.response?.data);
      setError("City not found");
      setData(null);
    }
  };

  return (
    <div className="container">
      <h1> Weather App</h1>
      <input type="text" placeholder="Enter city" onChange={(e)=>setCity(e.target.value)}/>
      <button onClick={getWeather}>Search</button>
      {error && <p>{error}</p>}
      {data && (
        <div className="card">
          <h2>{data.location.name}</h2>
          <p>{data.current.temp_c}°C</p>
          <p>{data.current.condition.text}</p>
          <p>Humidity: {data.current.humidity}%</p>
          <p>Wind: {data.current.wind_kph} kph</p>
          <p></p>
          
        </div>
      )}
    </div>
  );
}
export default App;