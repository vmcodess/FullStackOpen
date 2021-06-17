import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Country from './components/Country/Country'

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
              ? <Country data={filteredCountries[0]}/>
              : ''
        }
      </div>
    </div>
  )
}
export default App;
