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

  const showMessage = (message, isError = false) => {
    const setMessage = isError ? setErrorMessage : setSuccessMessage;
    setMessage(message);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    const fetchData = () => {
      personServices
        .getPersons()
        .then((persons) => {
          setPersons(persons);
        })
        .catch((error) => console.log(error.message));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilterNames(() => {
      if (!newNameFilter) return persons;
      return persons.filter((person) =>
        person.name.toLowerCase().includes(newNameFilter.toLowerCase())
      );
    });
  }, [persons, newNameFilter]);

  const handleFilterNameInput = (event) => {
    setNameFilter(event.target.value);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleUpdatePerson = (personExist) => {
    const toUpdate = window.confirm(
      `${personExist.name} is already added to phonebook, replace the old number with the new?`
    );

    const person = {
      ...personExist,
      number: newNumber,
    };

    if (toUpdate) {
      personServices
        .updatePerson(personExist.id, person)
        .then((updatedPerson) => {
          showMessage(`Updated ${updatedPerson.name}`, false);

          const isFound = persons
            .map((person) => person.id)
            .includes(updatedPerson.id);

          if (isFound) {
            setPersons((persons) =>
              persons.map((person) =>
                person.id === updatedPerson.id
                  ? { ...person, number: newNumber }
                  : person
              )
            );
          } else {
            setPersons(persons.concat(updatedPerson));
          }
        })
        .catch((error) => {
          showMessage(error.message, true);
        })
        .finally(() => {
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const handleNewPerson = (person) => {
    personServices
      .addPerson(person)
      .then((newPerson) => {
        showMessage(`Added ${newPerson.name}`, false);
        setPersons(persons.concat(newPerson));
      })
      .catch((error) => {
        showMessage(error.message, true);
        if (error.name === "DuplicateNameError") {
          person.id = error.id;
          handleUpdatePerson(person);
        }
      })
      .finally(() => {
        setNewName("");
        setNewNumber("");
      });
  };

  const handleNewEntry = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    const personExist = persons.find((person) => person.name === newName);

    if (personExist) {
      handleUpdatePerson(personExist);
    } else {
      handleNewPerson(person);
    }
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}`)) {
      return;
    }

    personServices
      .deletePerson(id)
      .then(() => {
        showMessage(`Remove ${name} successful`);
        setPersons((persons) => persons.filter((person) => person.id != id));
      })
      .catch((error) => {
        showMessage(error.message, true);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={successMessage} error={errorMessage} />
      <Filter onFilterInput={handleFilterNameInput} />
      <h3>Add A New</h3>
      <Form
        onAddNew={handleNewEntry}
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
