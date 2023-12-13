import React, { useState, useEffect } from 'react';
//import { getMyValue } from './Search';
const Saved = ({ savedLocations }) => {
  const [savedWeatherData, setSavedWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const updatedSavedWeatherData = [];

      for (const savedLocation of savedLocations) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${savedLocation.location}&appid=bfde2325bea6f9dfb9678e2f917482f4&units=metric`
          );
          const data = await response.json();

          if (response.ok) {
            updatedSavedWeatherData.push({
              location: savedLocation.location,
              temperature: data.main.temp,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              visibility: data.visibility,
              atmosphericPressure: data.main.pressure,
            });
          } else {
            console.error(`Error fetching weather data for ${savedLocation.location}: ${data.message}`);
          }
        } catch (error) {
          console.error(`Error fetching weather data for ${savedLocation.location}:`, error);
        }
      }

      setSavedWeatherData(updatedSavedWeatherData);
    };

    if (savedLocations.length > 0) {
      fetchWeatherData();
    }
  }, [savedLocations]);

//   const myValue = getMyValue();
// console.log(getMyValue);
  return (
    <div className="text-center">
      <h2 className="mb-4">Saved Locations</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Wind Speed (m/s)</th>
            <th>Visibility (meters)</th>
            <th>Atmospheric Pressure (hPa)</th>
          </tr>
        </thead>
        <tbody>
          {savedWeatherData.map((savedWeather, index) => (
            <tr key={index}>
              <td>{savedWeather.location}</td>
              <td>{savedWeather.temperature}</td>
              <td>{savedWeather.humidity}</td>
              <td>{savedWeather.windSpeed}</td>
              <td>{savedWeather.visibility}</td>
              <td>{savedWeather.atmosphericPressure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Saved;
