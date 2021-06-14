import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const handleNameChange = (event) => (
    setNewName(event.target.value)
  )

  const handleNumberChange = (event) => (
    setNumber(event.target.value)
  )

  const handleSearchChange = (event) => (
    setSearch(event.target.value)
  )

  const addName = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personsObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personsObject))
      setNewName('')
      setNumber('')
    }
  }

  const filteredNames = persons.filter(person => {
    return person.name.toLowerCase().includes(search.toLowerCase())
  }) 

  const displayFilteredNames = () => {
    return filteredNames.map(found => <p key={found.name}>{found.name} {found.number}</p>)
  }

  // const displayPersons = () => (
  //   persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  // )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={handleSearchChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* {displayPersons()} */}
      {displayFilteredNames()}
    </div>
  )
}

export default App