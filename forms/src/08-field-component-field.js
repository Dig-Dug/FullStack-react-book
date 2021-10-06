import PropTypes from 'prop-types';
import React from 'react';

/**
 * child input component
 */
module.exports = class extends React.Component {
  static propTypes = {
    //passed through input
    placeholder: PropTypes.string,
    //name in eventHandler to store input data and error
    name: PropTypes.string.isRequired,
    //value so parent initializes Field
    value: PropTypes.string,
    validate: PropTypes.func,
    //event handler runs when Field is changed,
    onChange: PropTypes.func.isRequired,
  };
//current value and error, initial state
  state = {
    value: this.props.value,
    error: false,
  };
//when parent wants to update value of prop
//lifecycle method
  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }
//use of event object
//validation, and parent event handler
  onChange = (evt) => {
    const name = this.props.name;
    //current text
    const value = evt.target.value;

    const error = this.props.validate ? this.props.validate(value) : false;
//update
    this.setState({ value, error });

    this.props.onChange({ name, value, error });
  };
//input and span error
//placeholder passed from parent (this.props)
//values store (this.state)
  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
        />
        <span style={{ color: 'red' }}>{ this.state.error }</span>
      </div>
    );
  }
};
//Field used by parent passes its own event handler (this.onChange prop)
//Field will be used in render from parent
