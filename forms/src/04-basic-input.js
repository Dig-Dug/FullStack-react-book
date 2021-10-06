import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

//Uncontrolled componet--react dont control rendering

module.exports = class extends React.Component {
  //static property displayName
  static displayName = "04-basic-input";
  
  state = { names: [] }; // <-- initial state empty

 /**
1create new var that coopies current names
2add new name to array
3use var in call to this.setState()
4Clear text clear after submitting
 */
  onFormSubmit = (evt) => {
    const name = this.refs.name.value;
    const names = [ ...this.state.names, name ];
    this.setState({ names: names });
    this.refs.name.value = '';
    evt.preventDefault();
  };
  //showing list
  render() {
    return (
      //div containing list and everything

//this.state.names (array) use map to iterate the li without using return
//key prop to li. Needed from react for reuse. For special cases
//assign immutable id to each name check:
//multiple conpobebts and Dynamic Children 
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
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
