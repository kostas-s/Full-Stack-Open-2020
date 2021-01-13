import React, { useState, useEffect } from 'react'
import { createPerson, getAllPersons, deletePerson, updatePerson } from './services/phones'
import Notification from './components/Notification'
import './index.css'


const Filter = ({filterString, handleFilterChange}) => {
  return <div>filter shown with<input value={filterString} onChange={handleFilterChange}/></div>
}

const Entry = ({name, number, id, handleClick}) => 
  <li className="phone-entry">{name} {number} <Button handleClick={handleClick} text={"delete"} id={id}/></li>


const Button = ({handleClick, text, id}) =>
  <button id={id} onClick={handleClick}>{text}</button>

const PersonForm = ({newName, newNumber, addEntry, handleChangeName, handleChangeNumber}) => {
return(
<form>
  <div>name: <input value={newName} onChange={handleChangeName}/></div>
  <div>number: <input value={newNumber} onChange={handleChangeNumber}/></div>
  <div><button type="submit" onClick={addEntry}>add</button></div>
</form>
)}

const Persons = ({shownPersons, handleClick}) => {
  return (
    <ul type="none">
    {shownPersons.map(person => 
    <Entry
     key={person.name}
     name={person.name}
     number={person.number} 
     id={person.id}
     handleClick={handleClick}/>)}
  </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('')
  const [ shownPersons, setShownPersons ] = useState(persons)
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('n')

  useEffect(() => {
      getAllPersons()
      .then(allPersons => {
        setPersons(allPersons)
        setShownPersons(allPersons)
      })
  }, [])

  const deleteEntry = (event) => {
    event.preventDefault()
    
    const id = Number(event.target.id)
    const person = persons.find(person => person.id === id)
    if (!person) {
      return null;
    }
    const name = person.name
    const confirm = window.confirm(`Delete ${name}?`)
    if (confirm) {  
      deletePerson(id)
      .then(response => {
      setPersons(persons.filter(person => person.id !== id))
      setShownPersons(persons.filter(person => person.id !== id))
      setNotificationType('n')
      setNotificationMessage(`${name} successfully deleted`)
      setTimeout(() => {
        setNotificationMessage(null)
        }, 5000)
      })    
      .catch(error => {
        setNotificationType('e')
        setNotificationMessage(`${name} info not found in server`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
    
  }

  const updateEntry = (id, newPerson) => {
    id = Number(id)
    updatePerson(id, newPerson)
    .then(response => {
      console.log(response)
      setPersons(persons.map(person => person.id !== id ? person : response))
      setShownPersons(shownPersons.map(person => person.id !== id ? person : response))
      setNotificationType('n')
      setNotificationMessage(`${newPerson.name} successfully updated`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
    .catch(error => {
      setNotificationType('e')
      setNotificationMessage(`${newPerson.name} info not found in server`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
    
  } 

  const addEntry = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number:newNumber}
    const currNames = persons.map(person => person.name.toLowerCase())
    if (currNames.includes(newPerson.name.toLowerCase())) {
      const confirm = window.confirm(`${newName} is already added to the phonebook,
       replace the old number with a new one?`)
      if (confirm) {
        updateEntry(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id, newPerson)
      }
    } else {
      createPerson(newPerson)
      .then(addedPerson => {
        console.log(addedPerson)
        setPersons(persons.concat(addedPerson))
        setShownPersons(persons.concat(addedPerson))
        setFilterString("")
        setNotificationType('n')
        setNotificationMessage(`Successfully added ${newPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
    setNewName("")
    setNewNumber("")
  }

  const handleChangeNumber = (event) => setNewNumber(event.target.value)

  const handleChangeName = (event) => setNewName(event.target.value)

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase()
    setFilterString(value)
    setShownPersons(persons.filter(person => person.name.toLowerCase().includes(value)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
        <Filter filterString={filterString} handleFilterChange={handleFilterChange}/>
      <h3>Add new</h3>
        <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber} 
        addEntry={addEntry}
        />
      <h3>Numbers</h3>
        <Persons 
        shownPersons={shownPersons}
        handleClick={deleteEntry}
        />
    </div>
  )
}

export default App