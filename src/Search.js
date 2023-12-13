import React, { useState, useEffect } from 'react';

const Search = ({ onSave }) => {
  const [location, setLocation] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'bfde2325bea6f9dfb9678e2f917482f4';

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
          setForecastData(data.list);
          setError(null);
        } else {
          setError(data.message);
          setForecastData(null);
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setError('Error fetching forecast data');
        setForecastData(null);
      }
    };

    if (location.trim() !== '') {
      handleSearch();
    }
  }, [location, apiKey]);

  const handleSave = () => {
    onSave({
      location: location,
    });
    setLocation('');
  };

  return (
    <div className="text-center" style={{justifyContent: 'center',alignItems: 'center', background: 'url(./images/city.jpg)',}} >
      <br />
      <br />
      <h2 className="mb-4" style={{ color: 'white' }} >Weather Forecast</h2>
      <div style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center', }}>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex mx-auto align-items-center" >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Search"
                style={{ width: '800px', color: 'black', background: 'transparent' }} 
              />
              <button className="btn btn-outline-secondary" type="submit" onClick={handleSave}>
                Save
              </button>
            </form>
          </div>
        </nav>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {forecastData && (
        <div style={{ color: 'white' }}>
          <br />
          <h3>Weather Forecast for the Next Few Days in {location}: {forecastData[0].sys.country}</h3>
          {forecastData.map((forecast, index) => (
            <div key={index}>
              <p>Date: {forecast.dt_txt}</p>
              <p>Temperature: {forecast.main.temp}°C</p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Wind Speed: {forecast.wind.speed} m/s</p>
              <p>Visibility: {forecast.visibility} meters</p>
              <p>Atmospheric Pressure: {forecast.main.pressure} hPa</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
