import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";

function App() {


  //  
  const  [data,setData] = useState({});

  // 
  const  [location,setLocation] = useState('');

  // WEATHER API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25160517a2420597ecea94ef0c801eb8`;

  // SEARCH FUCTION , WHICH SEARCH FOR THE LOCATION
  const Searchlocation = (e)=>{
    if (e.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data)
      })
    }
  }

  return (

    // APP CONTAINER
    <div className="App">

      <header>
        <input type='text' value={location} onChange={event.target.value} placeholder='Search Location'></input>
      </header>

      {/* MAIN */}
      <main>

        {/* TOP CONTAINER INSIDE MAIN */}
        <div className='top'>


          {/* LOCATION INSIDE TOP CONTAINER*/}
          <div className='location' style={{display: 'flex', alignItems: 'center', gap: '0.5em'}}>
            <p><FaLocationDot className='icon' style={{fontSize:'1rem', color: 'red'}}/></p>
            <p>Polokwane</p>
          </div>
          {/* ENDS */}


          {/* TEMPERRATURE INSIDE TOP CONTAINER*/}
          <div className='temperature'>
            <h1>60°F</h1>
          </div>
          {/* ENDS */}


          {/* DESCRIPTION OF THE CURRENT'S DAY WEATHER INSIDE TOP CONTAINER*/}
          <div className='description'>
            <p>Clouds</p>
          </div>
          {/* ENDS */}

        </div>
        {/* TOP CONTAINER ENDS */}


        {/* BOTTOM CONTAINER INSIDE MAIN*/}
        <div className='bottom'>

          {/* THE FEELS OF THE CURRENT DAY INSIDE BOTTOM CONTAINER*/}
          <div className='feels' style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
            <p><span>Feels like</span></p>
            <p>50°F</p>
          </div>
          {/* ENDS */}


          {/* HUMIDITY INSIDE BOTTOM CONTAINER*/}
          <div className='humidity' style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
            <p><span>Humidity</span></p>
            <p>60%</p>
          </div>
          {/* ENDS */}


          {/* WIND INSIDE BOTTOM CONTAINER*/}
          <div className='wind' style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
            <p><span>Wind</span></p>
            <p>2 MPH</p>
          </div>
          {/* ENDS */}

        </div>
        {/* BOTTOM CONTAINER ENDS */}

      </main>
      {/* MAIN ENDS */}
      
    </div>
    // APP CONTAINER ENDS
  );
}

export default App;
