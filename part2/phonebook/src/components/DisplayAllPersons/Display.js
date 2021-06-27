import React from 'react';

const Display = ({ persons, search }) => {
    let filteredNames = persons;
    if (search) {
        filteredNames = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <div>
            {filteredNames.map(found => <p key={found.name}> {found.name} {found.number} </p>)}
        </div>
    )
}

export default Display;