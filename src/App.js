import React, { useState } from 'react';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";
import { MdLocationSearching } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";
import { FaCloudMeatball } from "react-icons/fa";
import IntegrationNotistack from './snackbar';
import { useSnackbar } from 'notistack';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  // WEATHER API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25160517a2420597ecea94ef0c801eb8&units=metric`;

  // SEARCH FUNCTION
  const SearchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching the weather data:', error);
          enqueueSnackbar('Error fetching the weather data. Please try again.', { variant: 'error' });
        });
      setLocation('');
    }
  };

  return (
    <IntegrationNotistack>
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
                {data.main ? <h1>{data.main.temp}°C</h1> : null}
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
              <FaCloudMeatball className='cloudy-icon' />
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
                {data.wind ? <p>{data.wind.speed} mph</p> : null}
              </div>
              {/* ENDS */}
            </div>
            {/* BOTTOM CONTAINER ENDS */}
          </main>
        )}
      </div>
    </IntegrationNotistack>
  );
}

export default App;
