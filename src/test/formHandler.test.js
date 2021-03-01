// Import the js file to test
import {
  handleSubmit
} from "../client/js/formHandler";

import "babel-polyfill";
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Test: 'handleSubmit()'", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('handleSubmit should be Defined', () => {
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    expect(handleSubmit).toBeDefined();
  });

  test('Checking handleSubmit is a function', () => {
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    expect(typeof handleSubmit).toBe("function");
  });

});
