import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault();

    if (checkDuplicate()) {
      alert(`${newName} already exists in the phonebook.`)
    } else {
      setPersons(persons.concat({ name: newName}));
      setNewName('');
    }
  }

  const checkDuplicate = () => {
    return persons.some(person => person.name === newName)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          {persons.map(person => <p key={person.name}>{person.name}</p>)}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
