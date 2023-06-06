import { useState, useEffect } from 'react'
import axios from 'axios'

const Header = ({ text }) => <h2>{text}</h2>

const Filter = ({ filterValue, handleFilterChange }) => 
  <div>
    filter shown with 
    <input 
      value={ filterValue }
      onChange={ handleFilterChange }
    />
  </div>

const NewEntry = (props) => 
  <div>
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={ props.name } onChange={props.handleNameChange} /> <br />
        number: <input value={ props.number } onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>

const Entries = ({ persons, filterValue }) => 
<div>
  <ul>
    {
      persons
      .filter((person) => person.name.toLowerCase().includes(filterValue))
      .map((person) => 
        <li key={person.id}>
          {person.name}: {person.number}
        </li>)
    }
  </ul>
</div>

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ newFilter, setFilter ] = useState('');

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log("Promise success", response.data);
      setPersons(response.data);
    })
  }, []);

  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newPhone,
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
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

  return (
    <div>
      <Header text="Phonebook" />
      
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
      />
    </div>
  )
}

export default App