import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import QuickNavigation from '../quick-navigation/quick-navigation';

const shortcutBoxClickTest = (uniqueHeading, buttonRegexp) => {
  renderWithReduxRouter(<QuickNavigation />);
  const customerShortcutNode = screen.getByRole('button', {
    name: buttonRegexp,
  });
  userEvent.click(customerShortcutNode);
  const uniqueCustomerModalHeading = screen.getByText(uniqueHeading);
  const closeModalButtonNode = screen.getByRole('button', {
    name: /exit without save/i,
  });

  expect(uniqueCustomerModalHeading).toBeInTheDocument();
  userEvent.click(closeModalButtonNode);
  expect(uniqueCustomerModalHeading).not.toBeInTheDocument();
};

describe('QuickNavigation', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<QuickNavigation />);
  });

  test('should open customer-control-modal when clicked on customer shortcut button and exit modal when clicked "Exit without save" button', () => {
    shortcutBoxClickTest('Default invoicing details', /.+NEW CUSTOMER.+/i);
  });

  test('should open order-control-modal when clicked on order shortcut button and exit modal when clicked "Exit without save" button', () => {
    shortcutBoxClickTest('Order details', /.+NEW ORDER.+/i);
  });

  test('should open invoice-control-modal when clicked on invoice shortcut button and exit modal when clicked "Exit without save" button', () => {
    shortcutBoxClickTest('Invoice details', /.+NEW INVOICE.+/i);
  });
});
