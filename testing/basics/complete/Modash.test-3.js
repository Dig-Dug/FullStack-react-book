/* eslint-disable no-undef */

//Jasmine test, describe and it blocks
//describe used to organize assertions
//it are individual assertions
describe('My test suite', () => {
  it('`true` should be `true`', () => {
    expect(true).toBe(true);
  });

  it('`false` should be `false`', () => {
    expect(false).toBe(false);
  });
});
