import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";
import { MdLocationSearching } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";
import { FaCloudMeatball, FaCloud, FaSun, FaCloudRain, FaSnowflake, FaBolt, FaSmog } from "react-icons/fa";

function App() {

  // USESTATE
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  // ENDS

  // WEATHER API URL (Current Weather Data)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25160517a2420597ecea94ef0c801eb8&units=metric`;
  // ENDS

  // FETCH ONE CALL API DATA
  const fetchOneCallData = (lat, lon) => {
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=25160517a2420597ecea94ef0c801eb8&units=metric`;
    axios.get(oneCallUrl)
      .then((response) => {
        setHourly(response.data.hourly);
        setDaily(response.data.daily);
      })
      .catch((error) => {
        console.error('Error fetching the hourly and daily data:', error);
      });
  };
  // ENDS

  // LOAD WEATHER DATA FROM LOCALSTORAGE
  useEffect(() => {
    const savedData = localStorage.getItem('weatherData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);
  // ENDS

  // SAVE WEATHER DATA TO LOCALSTORAGE AFTER FETCHING IT
  useEffect(() => {
    if (data.name) {
      localStorage.setItem('weatherData', JSON.stringify(data));
    }
  }, [data]);
  // ENDS

  // SEARCH FUNCTION
  const SearchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          const { lat, lon } = response.data.coord;
          fetchOneCallData(lat, lon);  // Fetch hourly and daily forecast data
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching the weather data:', error);
        });
      setLocation('');
    }
  };
  // ENDS

  // FUNCTION TO SELECT THE APPROPIATE ICON BASED ON WEATHER CONDITION
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <FaSun className='weather-icon' style={{ color: 'orange', fontSize: '7rem' }}/>;
      case 'Clouds':
        return <FaCloud className='weather-icon' style={{ color: 'white', fontSize: '7rem' }}/>;
      case 'Rain':
        return <FaCloudRain className='weather-icon' style={{ color: 'blue', fontSize: '7rem' }}/>;
      case 'Snow':
        return <FaSnowflake className='weather-icon' style={{ color: 'lightblue', fontSize: '7rem' }}/>;
      case 'Thunderstorm':
        return <FaBolt className='weather-icon' style={{ color: 'yellow', fontSize: '7rem' }}/>;
      case 'Drizzle':
        return <FaCloudRain className='weather-icon' style={{ color: 'blue', fontSize: '7rem' }}/>;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return <FaSmog className='weather-icon' style={{ color: 'lightgray', fontSize: '7rem' }}/>;
      default:
        return <FaCloudMeatball className='weather-icon' />;
    }
  };
  // ENDS

  // FORMAT TIME FOR HOURLY FORECAST
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  // ENDS

  // FORMAT DAY FOR DAILY FORECAST
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString([], { weekday: 'long' });
  };
  // ENDS

  // START OF CONTENT
  return (

    // WRAP CONTAINER
    <div className="App">

      {/* SEARCH */}
      <header>
        <MdLocationSearching className='search-icon' />
        <input
          type='text'
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder='Search Location'
          onKeyPress={SearchLocation}
        />
        <div className='hamburger'>
          <IoMenuSharp className='menu-icon' />
        </div>
      </header>
      {/* ENDS */}

      {/* CONDITION TO CHECK IF THERE'S NAME IN DATA TO DISPLAY, AND IF THE CONDITION IS TRUE , THE CONTENT IS DISPLAYED OTHERWISE IT REMAIN HIDDEN */}
      {data.name && (

        <main>

          {/* TOP CONTAINER INSIDE MAIN */}
          <div className='top'>

            {/* LOCATION INSIDE TOP CONTAINER */}
            <div className='location' style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <p><FaLocationDot className='icon' style={{ fontSize: '1.18rem', color: 'red' }} /></p>
              <p>{data.name}</p>
            </div>
            {/* ENDS */}

            {/* TEMPERATURE INSIDE TOP CONTAINER */}
            <div className='temperature'>
              {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
              <p>Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
            {/* ENDS */}

            {/* DESCRIPTION OF THE CURRENT WEATHER INSIDE TOP CONTAINER */}
            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            {/* ENDS */}

          </div>
          {/* TOP CONTAINER ENDS */}

          {/* MIDDLE CONTAINER */}
          <div className='middle'>
            {data.weather ? getWeatherIcon(data.weather[0].main) : null}

            {/* HOURLY FORECAST */}
            <div className='hourly'>
        
              <div style={{ display: 'flex', overflowX: 'scroll', gap: '1em' }}>
                {hourly.slice(0, 12).map((hour, index) => (
                  <div key={index} className='hour'>
                    <p>{formatTime(hour.dt)}</p>
                    <p>{Math.round(hour.temp)}°C</p>
                    {getWeatherIcon(hour.weather[0].main)}
                  </div>
                ))}
              </div>
            </div>
            {/* ENDS */}

            {/* DAILY FORECAST */}
            <div className='daily'>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                {daily.slice(0, 7).map((day, index) => (
                  <div key={index} className='day' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>{formatDay(day.dt)}</p>
                    <p>{Math.round(day.temp.day)}°C</p>
                    {getWeatherIcon(day.weather[0].main)}
                  </div>
                ))}
              </div>
            </div>
            {/* ENDS */}
          </div>
          {/* MIDDLE CONTAINER ENDS */}

          {/* BOTTOM CONTAINER INSIDE MAIN */}
          <div className='bottom'>

            {/* FEELS LIKE INSIDE BOTTOM CONTAINER */}
            <div className='feels' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Feels-like</span></p>
              {data.main ? <p>{Math.round(data.main.feels_like)}°C</p> : null}
            </div>
            {/* ENDS */}

            {/* HUMIDITY INSIDE BOTTOM CONTAINER */}
            <div className='humidity' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Humidity</span></p>
              {data.main ? <p>{data.main.humidity}%</p> : null}
            </div>
            {/* ENDS */}

            {/* WIND INSIDE BOTTOM CONTAINER */}
            
            <div className='wind' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Wind speed</span></p>
              {data.wind ? <p>{Math.round(data.wind.speed)} mph</p> : null}
            </div>
            {/* ENDS */}

          </div>
          {/* BOTTOM CONTAINER ENDS */}

        </main>
      )}
    </div>
  );
}

export default App;
