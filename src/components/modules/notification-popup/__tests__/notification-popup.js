import React from 'react';

import { renderWithReduxRouter, screen } from 'utils/tests/test-helper';
import { theme } from 'themes/theme';
import NotificationPopup from '../notification-popup';

const successMsg =
  'Success! The popup informs you that something was done correcty!';

const errorMsg = 'Error! The popup informs you that something went wrong!';

describe('NotificaionPopup', () => {
  test('should display succes notification in the doucment with correct styles', () => {
    renderWithReduxRouter(
      <div>
        <NotificationPopup successRegexp='Success!'>
          {successMsg}
        </NotificationPopup>
        <button>submit</button>
      </div>,
    );

    const NotificationPopupNode = screen.getByTestId('notification-popup');
    const NotificationSpanNode = screen.getByText(successMsg);

    expect(NotificationPopupNode).toBeInTheDocument();
    expect(NotificationSpanNode).toHaveStyle(`color: ${theme.color.success}`);
    expect(NotificationPopupNode).toMatchSnapshot();
  });

  test('should display error notification in the doucment with correct styles', () => {
    renderWithReduxRouter(
      <div>
        <NotificationPopup successRegexp='Success!'>
          {errorMsg}
        </NotificationPopup>
        <button>submit</button>
      </div>,
    );

    const NotificationPopupNode = screen.getByTestId('notification-popup');
    const NotificationSpanNode = screen.getByText(errorMsg);

    expect(NotificationPopupNode).toBeInTheDocument();
    expect(NotificationSpanNode).toHaveStyle(`color: ${theme.color.danger}`);
    expect(NotificationPopupNode).toMatchSnapshot();
  });
});
