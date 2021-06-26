import React from 'react';

const Country = ({data}) => {
  console.log(data);
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
        }}/>
    </div>
  )
}

export default Country;