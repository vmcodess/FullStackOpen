import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search/Search'
import Form from './components/AddPersonForm/Form'
import Display from './components/DisplayAllPersons/Display'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
  }, [])

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

  const filteredNames = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())); 

  return (
    <div>
      <h2>Phonebook</h2>
      <Search 
        search={search} 
        handleSearchChange={handleSearchChange} 
      />
      <h2>add a new</h2>
      <Form 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Display filteredNames={filteredNames} />
    </div>
  )
}

export default App