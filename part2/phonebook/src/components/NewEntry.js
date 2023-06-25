const NewEntry = (props) => 
  <div>
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={ props.name } onChange={props.handleNameChange} /> <br />
        number: <input value={ props.phone } onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>

  export default NewEntry;