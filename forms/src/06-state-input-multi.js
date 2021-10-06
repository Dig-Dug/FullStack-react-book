import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "06-state-input-multi";
//adding email address, fields object avoids adding property for
//each input on state
  state = {
  //update of nested state
    fields: {
      name: '',
      email: ''
    },
    people: [],
  };

  onFormSubmit = (evt) => {
    //obtain local reference of list of people from this.state.people
    const people = [
      ...this.state.people,
     //adding fields object
      this.state.fields,
    ];
    //simultaneous update list
    this.setState({ 
      people, 
   
      fields: {
        name: '',
        email: ''
      } 
    });
    evt.preventDefault();
  };
/**
 called when any fields input change
 */
  onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  };

  render() {
    return (
  /**
 1.Adding 2nd input to handle email
 2.changed value prop of input, accesing only state.fields
 3.both input fields have a name prop, helping onInputChange
 4.li element displays previous name and new email
   */
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
          />

          <input
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />

          <input type='submit' />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email }, i) =>
              <li key={i}>{name} ({ email })</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
};
