
import { shallow } from 'enzyme';
import React from 'react';
import FoodSearch from '../src/FoodSearch';
import Client from '../src/Client';
//jest mocking client
jest.mock('../src/Client');

describe('FoodSearch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FoodSearch />
    );
  });

  it('should not display the remove icon', () => {
    expect(
      wrapper.find('.remove.icon').length
    ).toBe(0);
  });

  it('should display zero rows', () => {
    expect(
      wrapper.find('tbody tr').length
    ).toEqual(0);
  });

  describe('user populates search field', () => {
    const value = 'brocc';
//this triggers call to Client.search() in FoodSearch.js
//calls method that jest created...
    beforeEach(() => {
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value: value },
      });
    });

    it('should update state property `searchValue`', () => {
      expect(
        wrapper.state().searchValue
      ).toEqual(value);
    });
//assertion
    it('should display the remove icon', () => {
      expect(
        wrapper.find('.remove.icon').length
      ).toBe(1);
    });
//calling mock.calls property
    it('...todo...', () => {
      const firstInvocation = Client.search.mock.calls[0];
      console.log('First invocation:');
      console.log(firstInvocation);
      console.log('All invocations: ');
      console.log(Client.search.mock.calls);
    });

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
