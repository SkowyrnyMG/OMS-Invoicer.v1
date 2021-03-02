import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import Hamburger from '../hamburger';

const handleTestClick = jest.fn();

describe('Hamburger', () => {
  test('should render into document with correct styles', () => {
    renderWithReduxRouter(
      <Hamburger isMenuOpen={false} toggleMenu={handleTestClick} />,
    );

    const HamburgerComponent = screen.getByRole('button', { name: '' });

    expect(HamburgerComponent).toBeInTheDocument();
    expect(HamburgerComponent).toMatchSnapshot();
  });

  test('should handle hamburger clicks', () => {
    renderWithReduxRouter(
      <Hamburger isMenuOpen={false} toggleMenu={() => handleTestClick()} />,
    );

    const HamburgerComponent = screen.getByRole('button', { name: '' });

    userEvent.click(HamburgerComponent);

    expect(handleTestClick).toHaveBeenCalledTimes(1);
  });
});
