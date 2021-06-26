import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API;

const Country = ({data}) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${data.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  },[data.capital])

  let dataToRender;
  if (data) {
    dataToRender = data.languages.map((lang, i) => {
      return <li key={i}>{lang.nativeName}</li>
    });
  } else {
    dataToRender = 'Loading...';
  }
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>
        capital {data.capital} <br />
        population {data.population}
      </p>
      <h3>languages</h3>
      <div>
        <ul>
          {dataToRender}
        </ul>
      </div>
      <img 
        src={data.flag} 
        alt={'flag'} 
        style={{
          height:"100px",
          width: "100px"
        }}
      />

      <div>
        <h3>Weather in {data.capital}</h3>
        <strong>temperature:</strong> {weather.temperature} Celcius <br />
        <img 
          src={weather.weather_icons}
          alt={'icon'}
        /> <br />
        <strong>wind:</strong> {weather.wind_speed} MPH direction {weather.wind_dir}
      </div>
    </div>
  )
}

export default Country;