import React, { useState, useEffect } from 'react';

const Home = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'bfde2325bea6f9dfb9678e2f917482f4';

  useEffect(() => {
    const handleSearch = async (latitude, longitude) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
          setError(null);
        } else {
          setError(data.message);
          setWeatherData(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data');
        setWeatherData(null);
      }
    };

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSearch(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
          setError('Error getting location. Please enter a location manually.');
          setWeatherData(null);
        }
      );
    };

    const storedLocation = localStorage.getItem('currentLocation');
    if (storedLocation) {
      setLocation(storedLocation);
    } else {
      getLocation();
    }
  }, [apiKey]);

  useEffect(() => {
    if (location.trim() !== '') {
      localStorage.setItem('currentLocation', location);
    }
  
}, [location]
  );

  return (

    <div style={{ background: 'url(./images/city.jpg) ', height: '100vh',  display: 'flex',  alignItems: 'center', justifyContent: 'center', color: 'white' }}>      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div>
          <h1>Welcome to Weather App!</h1><br></br>
          <h3>Weather in your location : {weatherData.name}, {weatherData.sys.country}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Visibility: {weatherData.visibility} meters</p>
          <p>Atmospheric Pressure: {weatherData.main.pressure} hPa</p>
          <br></br><br></br>
          <h6 style={{fontSize:'13px'}}><i>V   press search below to get your desired location's weather</i></h6>
        </div>
      )}
    </div>
    
  );
};

export default Home;