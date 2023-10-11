import React, { useState, useEffect } from 'react';
import axios from 'axios';

import phonebookService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete this contact?')) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
