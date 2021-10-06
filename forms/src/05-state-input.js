import React from 'react';
//Controlled Component
const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "05-state-input";
//default empty strings
  state = {
    name: '',
    names: [],
  };
//adding entered name to list (no more refs)
//this.state.name will be continually updated by onNameChange
  onFormSubmit = (evt) => {
    const names = [ ...this.state.names, this.state.name ];
    this.setState({ names: names, name: '' });
    evt.preventDefault();
  };
//operational input, updating state.name
  onNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  };
//Controlled input
//removed the red prop replacing it with a value and onChange prop
//value always set to state property

render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            value={this.state.name}
            onChange={this.onNameChange}
          />

          <input type='submit' />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
            { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
          </ul>
        </div>
      </div>
    );
  }
};
