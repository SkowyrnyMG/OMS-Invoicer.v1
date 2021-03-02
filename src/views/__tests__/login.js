import React from 'react';
import { renderWithReduxRouter } from 'utils/tests/test-helper';
import Login from '../login';

describe('Login page', () => {
  test('should render into document', () => {
    const { container } = renderWithReduxRouter(<Login />);
    const loginPageContainer = container.firstChild;

    expect(loginPageContainer).toBeInTheDocument();
  });
});
