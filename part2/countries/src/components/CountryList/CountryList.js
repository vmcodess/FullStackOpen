import React, {useState} from 'react';
import Country from '../Country/Country';

const CountryList = ({ filteredCountries }) => {
    const [ showInfo, setShowInfo ] = useState({})

    const displayCountries = () => {
        return filteredCountries.map((country) => {
            return (
                <div key={country.name}>
                    {country.name}
                    <button onClick={() => setShowInfo(country)}>Show</button>
                </div>
            )
        })
    }

    if (filteredCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
            <div>
                {displayCountries()}
                {showInfo.name && <Country data={showInfo} />}
            </div>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <Country data={filteredCountries[0]}/>
        )
    }
    
    return null
}

export default CountryList;