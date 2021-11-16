
import { shallow } from 'enzyme';
import React from 'react';
import FoodSearch from '../src/FoodSearch';


//initial state specs
describe('FoodSearch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FoodSearch />
    );
  });
//remove icon is not in the DOM, find method(returns an array-like)
  it('should not display the remove icon', () => {
    expect(
      wrapper.find('.remove.icon').length
  //array should be 0
    ).toBe(0);
  });
//table dont have any entries
  it('should display zero rows', () => {
    expect(
      wrapper.find('tbody tr').length
    ).toEqual(0);
  });

  describe('user populates search field', () => {
    beforeEach(() => {
      // ... simulate user typing "brocc" in input
    });

    // ... specs

    describe('and API returns results', () => {
      beforeEach(() => {
        // ... simulate API returning results
      });

      // ... specs

      describe('then user clicks food item', () => {
        beforeEach(() => {
          // ... simulate user clicking food item
        });

        // ... specs
      });

      describe('then user types more', () => {
        beforeEach(() => {
          // ... simulate user typing "x"
        });

        describe('and API returns no results', () => {
          beforeEach(() => {
            // ... simulate API returning no results
          });

          // ... specs
        });
      });
    });
  });
});
