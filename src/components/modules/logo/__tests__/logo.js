import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import Logo from '../logo';

describe('Logo', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<Logo />);
  });

  test('should redirect to home page after logo click', () => {
    const { history } = renderWithReduxRouter(
      <Logo />,
      {},
      { route: '/login' },
    );

    const LogoNode = screen.getByRole('link', { name: 'logo.svg Invoicer.v1' });
    const initialPath = history.location.pathname;

    userEvent.click(LogoNode);

    const finalPath = history.location.pathname;

    expect(initialPath).not.toBe(finalPath);
    expect(finalPath).toBe('/');
  });
});
