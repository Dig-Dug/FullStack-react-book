
import { shallow } from 'enzyme';
import React from 'react';
import FoodSearch from '../src/FoodSearch';
import Client from '../src/Client';

jest.mock('../src/Client');

describe('FoodSearch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FoodSearch />
    );
  });

  afterEach(() => {
    Client.search.mockClear();
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

    it('should display the remove icon', () => {
      expect(
        wrapper.find('.remove.icon').length
      ).toBe(1);
    });

    it('should call `Client.search() with `value`', () => {
      const invocationArgs = Client.search.mock.calls[0];
      expect(
        invocationArgs[0]
      ).toEqual(value);
    });
//first declare array foods used as fake result
    describe('and API returns results', () => {
      const foods = [
        {
          description: 'Broccolini',
          kcal: '100',
          protein_g: '11',
          fat_g: '21',
          carbohydrate_g: '31',
        },
        {
          description: 'Broccoli rabe',
          kcal: '200',
          protein_g: '12',
          fat_g: '22',
          carbohydrate_g: '32',
        },
      ];
    //grab second argument from Client.search() <- callback function
    //then invoke it with foods 
      beforeEach(() => {
        const invocationArgs = Client.search.mock.calls[0];
        const cb = invocationArgs[1];
        cb(foods);
    //after invoking callback function, wrapper.update() will
    //re render (wrapper.update() is called by enzyme after
    //every simulate() call)
        wrapper.update();
      });
//First spec: foods property in state must match foods array
      it('should set the state property `foods`', () => {
        expect(
          wrapper.state().foods
        ).toEqual(foods);
      });
//second spec: should display two rows
      it('should display two rows', () => {
        expect(
          wrapper.find('tbody tr').length
        ).toEqual(2);
      });
//both of foods must be displayed in table.
//Enzyme html() method returns html of the component
      it('should render the description of first food', () => {
        expect(
          wrapper.html()
        ).toContain(foods[0].description);
      });

      it('should render the description of second food', () => {
        expect(
          wrapper.html()
        ).toContain(foods[1].description);
      });

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
