import React from 'react';
import isEmail from 'validator/lib/isEmail';
//EMail module
const Field = require('./08-field-component-field.js');

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "08-field-component-form";

  state = {
    fields: {
      name: '',
      email: '',
    },
    fieldErrors: {},
    people: [],
  };

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: '',
      },
    });
  };
/**
 Field uses this function in the render
 */
  onInputChange = ({ name, value, error }) => {
    //updating
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;
//
    this.setState({ fields, fieldErrors });
  };

  validate = () => {
    //no field must be empty(name and email truthy)
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
  //validation keys filtering
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);
//no field must be empty, no errors
    if (!person.name) return true;
    if (!person.email) return true;
    if (errMessages.length) return true;

    return false;
  };
/**
 *use of Field component // use of prop "validate",
 isEmail module use
//disable: keeps button unactive
  
 */
  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>

          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Name Required')}
          />

          <br />

          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
          />

          <br />

          <input type='submit' disabled={this.validate()} />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email }, i) =>
              <li key={i}>{name} ({email})</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
};
