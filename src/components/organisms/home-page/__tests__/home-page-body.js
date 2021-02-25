import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import HomePageBody from '../body/home-page-body';

describe('HomePageBody', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<HomePageBody />);
  });

  test('should should redirect to the register page after if clicked on register link', () => {
    const { history } = renderWithReduxRouter(<HomePageBody />);

    const initialPath = history.location.pathname;
    const registerLinkNode = screen.getByRole('link', { name: /register/i });

    userEvent.click(registerLinkNode);

    const finalPath = history.location.pathname;

    expect(initialPath).not.toBe(finalPath);
    expect(finalPath).toBe('/register');
  });
});
