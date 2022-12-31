import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    if (newNumber === "" || newName === "") {
      alert(`Please fill all fields.`);
    } else if (checkDuplicate()) {
      alert(`${newName} already exists in the phonebook.`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.addPerson(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const checkDuplicate = () => {
    return persons.some((person) => person.name === newName);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} changeHandler={handleFilterChange} />

      <h3>Add a new number</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredNames} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
