import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Header from './components/Header'
import NewEntry from './components/NewEntry'
import Entries from './components/Entries'
import Filter from './components/Filter'
import { Notification, Message } from './components/Notification';
import './styles/index.css'

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ newFilter, setFilter ] = useState('');
  const [ notification, setNotification ] = useState(new Message(""));

  useEffect(() => {
    numberService
    .getAll()
    .then(initialNumbers => {
      console.log("Promise success", initialNumbers);
      setPersons(initialNumbers);
    })    
  }, []);

  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone,
    }

    numberService
      .add(personObject)
      .then(responseNumber => {
        setPersons(persons.concat(responseNumber));
        setNewName('');
        setNewPhone('');
        setNotification(new Message(`Number added`, "success"));
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handlePhoneDelete = (id) => {
    numberService
      .remove(id)
      .then(response => {
        console.log("response: ", response.status);
        if(response.status === 200) {
          let deletedPerson;
          setPersons(persons.filter(person => {
            if(person.id !== id)
              return true;
            deletedPerson = person;
            return false;
          }));
          setNotification(new Message(`${deletedPerson?.name}'s phone deleted...`, "success"));
        } else {
          console.log("status error: ", response.status);
        }
      })
      .catch(error => {
        console.log("Error: ", error);
        setNotification(new Message("Phone already deleted on server...", "error"));
        setPersons(persons.filter(person => person.id !== id))
      })
    // console.log("Updated persons: ", persons);

  }

  return (
    <div>
      <Header text="Phonebook" />
      <Notification 
        message={notification}
      />
      <Header text="Search" />
      <Filter filterValue={ newFilter } handleFilterChange={ handleFilterChange }/>
      
      <Header text="Add new" />
      <NewEntry 
        name={newName}
        handleNameChange={handleNameChange}
        number={newPhone}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <Header text="Numbers" />
      <Entries 
        persons={persons}
        filterValue={newFilter}
        handlePhoneDelete={handlePhoneDelete}
      />
    </div>
  )
}

export default App;