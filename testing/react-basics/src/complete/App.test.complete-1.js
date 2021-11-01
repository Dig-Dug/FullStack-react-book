/* leave first line blank for cq */
import App from './App';
import React from 'react';
//only function to shallow rendering
import { shallow } from 'enzyme';

describe('App', () => {
  it('should have the `th` "Items"', () => {
  //shallow wrapper rendering component. No DOM only virtual
    const wrapper = shallow(
      <App />
    );
    expect(
    //helper method "contains" <- table header assertion
    //expects html jsx returns boolean
      wrapper.contains(<th>Items</th>)
    ).toBe(true);
  });
});
