import React, { useState, useEffect } from 'react'
import Search from './components/Search/Search'
import Form from './components/AddPersonForm/Form'
import Display from './components/DisplayAllPersons/Display'
import PersonService from './components/Services/PersonService'
import Notification from './components/Notification/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState({
    message: null,
    result: null
  })

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

    if (persons.find(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        const newObj = {
          name: newName,
          number: newNumber
        }

        PersonService
          .update(id, newObj)
          .then(returnedPerson => {
            const newPerson = persons.map(person => person.id !== id ? person : returnedPerson)
            setPersons(newPerson)
            const resultMessage = {
              message: `Updated ${returnedPerson.name}`,
              result: 'success'
            }
            setSuccessMessage(resultMessage)
            setTimeout(() => {
              setSuccessMessage({...successMessage, message: null})
            }, 5000)
          })
          .catch((err) => {
            console.log(`error updating user: ${err}`)

            const resultMessage = {
              message: `Information of ${newObj.name} has already been removed from the server`,
              result: 'fail'
            }
            setSuccessMessage(resultMessage)
            setTimeout(() => {
              setSuccessMessage({...successMessage, message: null})
            }, 5000)
          })
      }
    } else {

      if (newName.length < 3) {
        console.log(`name gotta be more than 3 char length`);

        const resultMessage = {
          message: `Person validation failed: name: Path \`name\` (\`${newName}\`) is shorter than the minimum allowed length (3).`,
          result: 'fail'
        }
        setSuccessMessage(resultMessage)
        setTimeout(() => {
          setSuccessMessage({...successMessage, message: null})
        }, 5000)
      } else if (newNumber.length < 8) {
        console.log(`number gotta have at least 8 digits`);

        const resultMessage = {
          message: `Person validation failed: number: Path \`number\` (\`${newNumber}\`) must have at least 8 digits.`,
          result: 'fail'
        }
        setSuccessMessage(resultMessage)
        setTimeout(() => {
          setSuccessMessage({...successMessage, message: null})
        }, 5000)
      } else {

        const personObject = {
          name: newName,
          number: newNumber
        }

        PersonService
          .create(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNumber('')
  
            const resultMessage = {
              message: `Added ${newPerson.name}`,
              result: 'success'
            }
            setSuccessMessage(resultMessage)
            setTimeout(() => {
              setSuccessMessage({...successMessage, message: null})
            }, 5000)
          })
          .catch((err) => console.log(`error posting: ${err}`))
      }
    }
  }  

  const deletePersonHandler = (id) => {
    const personIDFound = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personIDFound.name} ?`)) {
      PersonService
        .remove(id)
        .then(response => {
          console.log(`deleted ${personIDFound.name} successfully`)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((err) => {
          console.log(`Error deleting: ${err}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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