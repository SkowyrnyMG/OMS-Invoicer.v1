import React from 'react';

import { renderWithReduxRouter, screen } from 'utils/tests/test-helper';
import ActionMenu from '../action-menu';

describe('ActionMenu', () => {
  test('should display in the document with correct styles', () => {
    renderWithReduxRouter(
      <ActionMenu>
        <button>Test button</button>
      </ActionMenu>,
    );

    const ActionMenuComponent = screen.getByRole('complementary', {
      name: '',
    });

    expect(ActionMenuComponent).toBeInTheDocument();
    expect(ActionMenuComponent).toMatchSnapshot();
  });
});
