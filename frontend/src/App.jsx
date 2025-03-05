// aja tämä ensin
// npm run server db.json jos käytössä

import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./notify.css";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input
        type="text"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter, deletePerson }) => {
  // toggleImportance={() => toggleImportanceOf(note.id)}

  return persons.map((item) => {
    //if (item.name.indexOf(filter) > -1) {
    if (item.name.includes(filter)) {
      return (
        <div key={item.name}>
          {" "}
          {item.name} {item.number}{" "}
          <button
            type="button"
            onClick={() => deletePerson(item.id, item.name)}
          >
            delete
          </button>
        </div>
      );
    } else {
      return null;
    }
  });
};

const Notification = ({ message, mode, setNotifyMessage }) => {
  let notifyStyle = null;

  /*
  if (mode === "success") {
    notifyStyle = {
      color: "green",
      background: "lightgrey",
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      fontStyle: "bold",
      fontSize: 20,
    };
  } else {
    notifyStyle = {
      color: "red",
      background: "lightgrey",
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      fontStyle: "bold",
      fontSize: 20,
    };
  }*/

  setTimeout(() => {
    //setNotifyMessage({ message: "", mode: "" });
    setNotifyMessage(null);
  }, 5000);

  <div className={mode === "success" ? "success" : "error"}></div>
  if (message !== null) {
    
    return <div className={mode === "success" ? "success" : "error"}>{message}</div>;
    //return <div style={notifyStyle}>{message}</div>;
  } else {
    return null;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notifyMessage, setNotifyMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const deletePerson = (id, personName) => {
    if (window.confirm(`Delete ${personName} ?`)) {
      personService.deletePerson(id).then((status) => {
        console.log("xxxxxxxxxxxxxxx");
        console.log("status");
        if (status === 204) {
          setPersons(persons.filter((item) => item.id !== id));

          setNotifyMessage({
            message: `Deleted ${personName}`,
            mode: "success",
          });
        }
      });
    }
  };


  


//...................................

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.filter((item) => item.name === newName).length === 0) {
      const newPerson = { name: newName, number: newNumber };

      personService.addPerson(newPerson).then((person) => {
        //setPersons(persons.concat(person));
        setPersons([...persons, person]);
        setNotifyMessage({ message: `Added ${newName}`, mode: "success" });
      }).catch((error) => {
        console.log("ERROR: ", error.response.data);
        setNotifyMessage({ message: `${error.response.data.error}`, mode: "error" });
        //return error;
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const newData = { name: newName, number: newNumber };
        let person = persons.filter((item) => item.name === newName); // haetaan id
        const id = person[0].id;

        personService
          .updatePerson(id, newData)
          .then((returnedPerson) => {
            setNotifyMessage({
              message: `Updated ${person[0].name}`,
              mode: "success",
            });

            setPersons(
              persons.map((item) => (item.id !== id ? item : returnedPerson))
            );
          })
          .catch((error) => {
            console.log("error", error);

            setNotifyMessage({
              message: `Information of '${person[0].name}' has already been removed from server`,
              mode: "error",
            });
            setPersons(persons.filter((n) => n.id !== id));
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notifyMessage && (
        <div>
          <Notification
            message={notifyMessage.message}
            mode={notifyMessage.mode}
            setNotifyMessage={setNotifyMessage}
          />
        </div>
      )}
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
