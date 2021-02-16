import React from 'react';
import {
  renderWithReduxRouter,
  screen,
  fireEvent,
  leftClick,
} from 'utils/tests/test-helper';
import { routes } from 'utils/routes';
import AppNavigation from '../app-navigation';

const linkRedirectChecker = (testid, route, initialPath = '/app') => {
  const { history } = renderWithReduxRouter(<AppNavigation />, {
    route: initialPath,
  });

  const navLink = screen.getByTestId(testid);

  fireEvent.click(navLink, leftClick);

  expect(initialPath).not.toBe(history.location.pathname);
  expect(history.location.pathname).toBe(route);
};

describe('App Navigation', () => {
  test('should render into document', () => {
    const { container } = renderWithReduxRouter(<AppNavigation />);
    const AppNavigationContainer = container.firstChild;

    expect(AppNavigationContainer).toBeInTheDocument();
    expect(AppNavigationContainer).toMatchSnapshot();
  });

  test('should change pathname to /app/invoices when clicked on Invoice navlink', () => {
    linkRedirectChecker('invoices-link', routes.appInvoices);
  });

  test('should change pathname to /app/orders when clicked on Orders navlink', () => {
    linkRedirectChecker('orders-link', routes.appOrders);
  });

  test('should change pathname to /app/customers when clicked on Customers navlink', () => {
    linkRedirectChecker('customers-link', routes.appCustomers);
  });

  test('should change pathname to /app/settings when clicked on Settings navlink', () => {
    linkRedirectChecker('settings-link', routes.appSettings);
  });

  test('should change pathname to /app/help when clicked on Help navlink', () => {
    linkRedirectChecker('help-link', routes.appHelp);
  });

  test('should change pathname to /app when clicked on Main desk navlink', () => {
    linkRedirectChecker('maindesk-link', routes.app, '/app/invoices');
  });
});
