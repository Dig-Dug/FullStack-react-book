/* leave first line blank for cq */
import App from './App';
import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
  //wrapper declared at top for scope recognition 
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  });
//it blocks are not setting up context anymore(shallow)
  it('should have the `th` "Items"', () => {
    expect(
      wrapper.contains(<th>Items</th>)
    ).toBe(true);
  });

  it('should have a `button` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <button>Add item</button>
      )
    ).toBe(true);
  });

  it('should have an `input` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <input />
      )
    ).toBe(true);
  });

  it('`button` should be disabled', () => {
    const button = wrapper.find('button').first();
    expect(
      button.props().disabled
    ).toBe(true);
  });
});
