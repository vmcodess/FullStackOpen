import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryList from './components/CountryList/CountryList';

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
        <CountryList filteredCountries={filteredCountries} />
      </div>
    </div>
  )
}
export default App;
