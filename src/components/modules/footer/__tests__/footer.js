import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  snapShotTest,
} from 'utils/tests/test-helper';
import Footer from '../footer';

describe('Footer', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<Footer />);
  });

  test('anchor should have correct attributes', () => {
    renderWithReduxRouter(<Footer />);

    const anchor = screen.getByText('App created by Mateusz Gruźla');

    expect(anchor).toHaveAttribute('href', 'https://mateuszgruzla.pl/');
  });
});
