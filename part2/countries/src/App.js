import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios 
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = search === '' ? [] : countries.filter(data => data.name.toLowerCase().includes(search.toLowerCase()));

  const countryInfo = (data) => {
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
            {data.languages.map((language, i) => (
              <li key={i}>{language.nativeName}</li>
            ))}
          </ul>
        </div>
        <img 
          src={data.flag} 
          alt={'flag'} 
          style={{
            height:"100px",
            width: "100px"
          }}/>
      </div>
    )
  }
  
  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <div>
        {filteredCountries.length > 10 
          ? 'Too many matches, specify another filter' 
          : filteredCountries.length <= 10 && filteredCountries.length > 1
            ? filteredCountries.map(found => <span key={found.name}> {found.name}<br /> </span>)
            : filteredCountries.length === 1
              ? countryInfo(filteredCountries[0])
              : ''
        }
      </div>
    </div>
  )
}
export default App;
