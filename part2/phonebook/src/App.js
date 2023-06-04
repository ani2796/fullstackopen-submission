import { useState } from 'react'

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
        phone: <input value={ props.phone } onChange={props.handlePhoneChange} />
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
          {person.name}: {person.phone}
        </li>)
    }
  </ul>
</div>

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ newFilter, setFilter ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    // console.log("button clicked, ", event);

    const personObject = {
      name: newName,
      id: persons.length + 1,
      phone: newPhone,
    }
    // console.log("new persons: ", persons.concat(personObject));

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  const handleNameChange = (event) => {
    // console.log("handle name change, ", event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    // console.log("handle phone change", event.target.value);
    setNewPhone(event.target.value);
  }

  const handleFilterChange = (event) => {
    // console.log("handle filter change", event.target.value);
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
        phone={newPhone}
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