import React from 'react';

const Country = ({data}) => {
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

export default Country;