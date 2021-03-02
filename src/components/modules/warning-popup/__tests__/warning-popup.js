import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  cleanup,
  waitFor,
} from 'utils/tests/test-helper';
import WarningPopup from '../warning-popup';

describe('WarningPopup', () => {
  test('should render in the document with correct styles ', async () => {
    renderWithReduxRouter(
      <WarningPopup title='test-warning-popup' isWarningOpen>
        <span>children</span>
      </WarningPopup>,
    );

    const WarningPopupNode = screen.getByTestId('warning-popup');

    await waitFor(() => {
      expect(WarningPopupNode).toHaveStyle('opacity: 1');
    });
    expect(WarningPopupNode).toMatchSnapshot();
    expect(WarningPopupNode).toBeInTheDocument();

    cleanup();
  });
});

// TODO write more edgecases!
