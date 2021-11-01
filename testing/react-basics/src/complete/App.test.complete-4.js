/* leave first line blank for cq */
import App from './App';
import React from 'react';
import { shallow } from 'enzyme';
//2 describes in file
describe('App', () => {
  let wrapper;
//beforeEach guarantees that first describe "shallows"
//before next "describe"
  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  });

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
//inner describe(first)
  describe('the user populates the input', () => {
    //item at the top for reference enable in specs(it)
    const item = 'Vancouver';

    beforeEach(() => {
      //find method
      const input = wrapper.find('input').first();
      //simulate <-user interactions on components
      //2 arguments
      input.simulate('change', {
      
        target: { value: item }
      })
    });
//wrapper.state() to grab state object
    it('should update the state property `item`', () => {
      expect(
        wrapper.state().item
      ).toEqual(item);
    });
// use of props()
    it('should enable `button`', () => {
      const button = wrapper.find('button').first();
      expect(
        button.props().disabled
      ).toBe(false);
    });
  });
});
