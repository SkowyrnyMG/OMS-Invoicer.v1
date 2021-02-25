import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import HomePageHeader from '../header/home-page-header';

describe('HomePageHeader', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<HomePageHeader />);
  });

  test('should redirect to the register page after clicked on register button', () => {
    const { history } = renderWithReduxRouter(<HomePageHeader />);

    const initialPath = history.location.pathname;
    const registerLinkNode = screen.getByRole('link', {
      name: 'TRY FOR FREE AND SEND ME SOME FEEDBACK',
    });

    userEvent.click(registerLinkNode);

    const finalPath = history.location.pathname;

    expect(initialPath).not.toBe(finalPath);
    expect(finalPath).toBe('/register');
  });
});
