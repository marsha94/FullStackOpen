import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Person from "./components/Person";
import personServices from "./services/personServices";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNameFilter] = useState("");
  const [filterNames, setFilterNames] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personData = await personServices.getPersons();
        setPersons(personData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterNameInput = (event) => {
    setNameFilter(event.target.value);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddNew = (event) => {
    event.preventDefault();

    const personExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personExist) {
      const toUpdate = window.confirm(
        `${personExist.name} is already added to phonebook, repalce the old number with the new?`
      );

      if (toUpdate) {
        const personObj = {
          ...personExist,
          number: newNumber,
        };

        const update = async () => {
          try {
            const updatePerson = await personServices.updatePerson(
              personExist.id,
              personObj
            );

            setPersons(
              persons.map((person) =>
                person.id === updatePerson.id ? updatePerson : person
              )
            );
          } catch (error) {
            console.log(error);
          }
        };
        return update();
      }
    }

    const personObj = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    const addNewPerson = async () => {
      console.log(personObj);
      try {
        const newPerson = await personServices.addPerson(personObj);
        setPersons(persons.concat(newPerson));
        setSuccessMessage(`Add ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (error) {
        setErrorMessage(`Please input name`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    };

    addNewPerson();
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id, name) => {
    const toDelete = window.confirm(`Delete ${name}`);

    const deletePerson = async () => {
      try {
        await personServices.deletePerson(id);
        setPersons(persons.filter((person) => person.id !== id));
      } catch (error) {
        setErrorMessage(
          `Information of ${name} has already removed from server`
        );
        try {
          const updatedPersons = await personServices.getPersons();
          setPersons(updatedPersons);
        } catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    };

    if (toDelete) deletePerson();
  };

  useEffect(() => {
    const names = persons.filter((person) =>
      person.name.toLowerCase().includes(newNameFilter.toLowerCase())
    );
    setFilterNames(names);
  }, [newNameFilter, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={successMessage} error={errorMessage} />
      <Filter onFilterInput={handleFilterNameInput} />
      <h3>Add A New</h3>
      <Form
        onAddNew={handleAddNew}
        onNameInput={handleNameInput}
        onNumberInput={handleNumberInput}
        name={newName}
        number={newNumber}
      />
      <h3>Numbers</h3>
      <Person persons={filterNames} onDelete={handleDelete} />
    </div>
  );
};

export default App;
