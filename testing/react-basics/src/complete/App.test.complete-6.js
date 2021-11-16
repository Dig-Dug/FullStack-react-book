/* leave first line blank for cq */
import App from './App';
import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
 //initial state assertions
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
//populated field assertions
  describe('the user populates the input', () => {
    const item = 'Vancouver';

    beforeEach(() => {
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value: item }
      });
    });

    it('should update the state property `item`', () => {
      expect(
        wrapper.state().item
      ).toEqual(item);
    });

    it('should enable `button`', () => {
      const button = wrapper.find('button').first();
      expect(
        button.props().disabled
      ).toBe(false);
    });
//assert button is disabled again
    describe('and then clears the input', () => {
      beforeEach(() => {
        const input = wrapper.find('input').first();
        input.simulate('change', {
          target: { value: '' }
        })
      });

      it('should disable `button`', () => {
        const button = wrapper.find('button').first();
        expect(
          button.props().disabled
        ).toBe(true);
      });
    });
//upcoming assertions
    describe('and then submits the form', () => {
      beforeEach(() => {
        const form = wrapper.find('form').first();
        form.simulate('submit', {
          //preventDefault to empty function
          preventDefault: () => {},
        });
      });
//assert new item is in state, toContain() matcher array assertion
      it('should add the item to state', () => {
        expect(
          wrapper.state().items
        ).toContain(item);
      });
//assert item is in table
      it('should render the item in the table', () => {
        expect(
        //containsMatchingElement stronger than contains()
          wrapper.containsMatchingElement(
            <td>{item}</td>
          )
        ).toBe(true);
      });
//assert input is cleared
      it('should clear the input field', () => {
        const input = wrapper.find('input').first();
        expect(
          input.props().value
        ).toEqual('');
      });
//assert button is again disabled
      it('should disable `button`', () => {
        const button = wrapper.find('button').first();
        expect(
          button.props().disabled
        ).toBe(true);
      });
    });
  });
});
