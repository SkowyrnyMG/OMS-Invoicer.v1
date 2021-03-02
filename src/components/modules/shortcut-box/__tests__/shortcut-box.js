import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import ShortcutBox from '../shortcut-box';

const handleTestClick = jest.fn();

describe('ShortcutBox', () => {
  test('should display in the document with correc styles', () => {
    renderWithReduxRouter(
      <ShortcutBox
        openOrderModal={handleTestClick}
        description='test-description'
        title='test title'
      >
        <div />
      </ShortcutBox>,
    );

    const ShortcutBoxNode = screen.getByRole('button', {
      name: 'test title test-description',
    });

    expect(ShortcutBoxNode).toBeInTheDocument();
    expect(ShortcutBoxNode).toMatchSnapshot();
  });

  test('should handle ShorcutBox click', () => {
    renderWithReduxRouter(
      <ShortcutBox
        openOrderModal={handleTestClick}
        description='test-description'
        title='test title'
      >
        <div />
      </ShortcutBox>,
    );

    const ShortcutBoxNode = screen.getByRole('button', {
      name: 'test title test-description',
    });

    userEvent.click(ShortcutBoxNode);

    expect(handleTestClick).toHaveBeenCalledTimes(1);
  });
});
