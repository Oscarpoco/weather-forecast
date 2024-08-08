import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";
import { MdLocationSearching } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";
import { FaCloudMeatball, FaCloud, FaSun, FaCloudRain, FaSnowflake, FaBolt, FaSmog } from "react-icons/fa";
import Popup from './Popup';

function App() {
  // USESTATE
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]); 
  // ENDS

  // WEATHER API URL
  const getWeatherUrl = (loc) => `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=25160517a2420597ecea94ef0c801eb8&units=metric`;
  // ENDS

  // LOAD WEATHER DATA AND SEARCH HISTORY FROM LOCALSTORAGE
  useEffect(() => {
    const savedData = localStorage.getItem('weatherData');
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
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

  // SAVE SEARCH HISTORY TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);
  // ENDS

  // SEARCH FUNCTION
  const SearchLocation = (e) => {
    if (e.key === 'Enter' && location) {
      axios.get(getWeatherUrl(location))
        .then((response) => {
          setData(response.data);
          setLocation('');
          const cityName = response.data.name;
          if (!searchHistory.includes(cityName)) {
            setSearchHistory([...searchHistory, cityName]);
          }
        })
        .catch((error) => {
          console.error('Error fetching the weather data:', error);
        });
    }
  };
  // ENDS

  // FUNCTION TO SELECT THE APPROPRIATE ICON BASED ON WEATHER CONDITION
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

  // FUNCTION TO HANDLE CITY SELECTION FROM POPUP
  const handleCitySelect = (city) => {
    axios.get(getWeatherUrl(city))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the weather data:', error);
      });
    setShowPopup(false);
  };

  return (
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
          <IoMenuSharp className='menu-icon' onClick={() => setShowPopup(true)} />
        </div>
      </header>
      {/* ENDS */}

      {/* POPUP */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} onCitySelect={handleCitySelect} searchHistory={searchHistory} />}
      {/* ENDS */}

      {/* CONDITION TO CHECK IF THERE'S NAME IN DATA TO DISPLAY */}
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
          </div>
          {/* ENDS */}

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
