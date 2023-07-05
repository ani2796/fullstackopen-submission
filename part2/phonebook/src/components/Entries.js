const Entries = ({ persons, filterValue, handlePhoneDelete }) => 
<div>
  <ul>
    {
      persons
      .filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))
      .map((person) => 
        <li key={person._id}>
          {person.name}: {person.phone}
          <button onClick={() => handlePhoneDelete(person.id)}>
            delete
          </button>
        </li>)
    }
  </ul>
</div>

export default Entries;