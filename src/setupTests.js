// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import { cleanup } from '@testing-library/react';
import { server } from 'utils/tests/server';

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  cleanup();
  localStorage.setItem('uuid', 'test-uuid');
});

afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});

afterAll(() => {
  server.close();
});

// * this two lines of code fixes strange and unreasonable console.error on psueudo elements during tests
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
