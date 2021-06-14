import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => (
    setNewName(event.target.value)
  )

  const addName = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personsObject = {
        name: newName,
        id: persons.length + 1
      }
      setPersons(persons.concat(personsObject))
      setNewName('')
    }
  }

  const displayPersons = () => (
    persons.map(person => <p key={person.name}>{person.name}</p>)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayPersons()}
    </div>
  )
}

export default App