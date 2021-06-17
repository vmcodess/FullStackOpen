import React from 'react';

const Display = ({ filteredNames }) => {
    return (
        <div>
            {filteredNames.map(found => <p key={found.name}>{found.name} {found.number}</p>)}
        </div>
    )
}

export default Display;