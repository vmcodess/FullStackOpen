import React, { useState, useEffect } from 'react'
import Search from './components/Search/Search'
import Form from './components/AddPersonForm/Form'
import Display from './components/DisplayAllPersons/Display'
import PersonService from './components/Services/PersonService'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => (
    setNewName(event.target.value)
  )

  const handleNumberChange = (event) => (
    setNumber(event.target.value)
  )

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      PersonService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNumber('')
        })
        .catch((err) => console.log(`error posting: ${err}`))
    }
  }  

  const deletePersonHandler = (id) => {
    const personIDFound = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personIDFound.name} ?`)) {
      PersonService
        .remove(id)
        .then(response => {
          //console.log(`deleted ${personIDFound.name} successfully`)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(err => console.log(`Error deleting: ${err}`))
    }
  }

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
      <Display persons={persons} search={search} deletePerson={deletePersonHandler} />
    </div>
  )
}

export default App