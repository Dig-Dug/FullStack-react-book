/* leave first line blank for cq */
import App from './App';
import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
  it('should have the `th` "Items"', () => {
    const wrapper = shallow(
      <App />
    );
    expect(
      wrapper.contains(<th>Items</th>)
    ).toBe(true);
  });

  it('should have a `button` element', () => {
    const wrapper = shallow(
      <App />
    );
    expect(
  //Enzyme "containsMatchingElement" for general identification
  //without many references
      wrapper.containsMatchingElement(
        <button>Add item</button>
      )
    ).toBe(true);
  });

  it('should have an `input` element', () => {
    const wrapper = shallow(
      <App />
    );
    expect(
  //Enzyme "containsMatchingElement" for general identification
  //without many references
      wrapper.containsMatchingElement(
        <input />
      )
    ).toBe(true);
  });
//found button, now be sure is disabled
  it('`button` should be disabled', () => {
    const wrapper = shallow(
      <App />
    );
    //Enzyme find method.(expects a CSS selector 'button')
    const button = wrapper.find('button').first();
    expect(
      //props returns an object
      button.props().disabled
    ).toBe(true);
  });
});
