import React from 'react';

const Display = ({ persons, search, deletePerson }) => {
    let filteredNames = persons;
    if (search) {
        filteredNames = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <div>
            {filteredNames.map(found => <div key={found.name}> {found.name} {found.number} <button onClick={() => deletePerson(found.id)}>delete</button></div>)}
            
        </div>
    )
}

export default Display;