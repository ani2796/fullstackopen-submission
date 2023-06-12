const Entries = ({ persons, filterValue, handlePhoneDelete }) => 
<div>
  <ul>
    {
      persons
      .filter((person) => person.name.toLowerCase().includes(filterValue))
      .map((person) => 
        <li key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => handlePhoneDelete(person.id)}>
            delete
          </button>
        </li>)
    }
  </ul>
</div>

export default Entries;