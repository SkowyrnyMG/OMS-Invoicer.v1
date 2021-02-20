import React from 'react';
import {
  fireEvent,
  leftClick,
  renderWithReduxRouter,
  screen,
} from 'utils/tests/test-helper';
import TopBar from '../top-bar';

const linkChecker = (history, getByText, directPath, regex) => {
  const initialPath = history.location.pathname;
  const registerLink = getByText(regex);
  fireEvent.click(registerLink, leftClick);
  const currentPath = history.location.pathname;

  expect(currentPath).not.toBe(initialPath);
  expect(currentPath).toContain(directPath);
};

describe('TopBar', () => {
  test('should render into document', () => {
    const { container } = renderWithReduxRouter(<TopBar />);
    const topBarContainer = container.firstChild;

    expect(topBarContainer).toBeInTheDocument();
  });

  test('should redirect to register page after click on Sign up link', () => {
    const { history } = renderWithReduxRouter(<TopBar />);

    const linkRegex = /sign up/i;
    const REGISTER_LINK = '/register';

    linkChecker(history, screen.getByText, REGISTER_LINK, linkRegex);
  });

  test('should redirect to login page after click on Sign in link', () => {
    const { history } = renderWithReduxRouter(<TopBar />);

    const linkRegex = /sign in/i;
    const LOGIN_LINK = '/login';

    linkChecker(history, screen.getByText, LOGIN_LINK, linkRegex);
  });

  test('should redirect to home page after logo click', () => {
    const { history } = renderWithReduxRouter(
      <TopBar />,
      {},
      { route: '/login' },
    );

    const logoLinkNode = screen.getByRole('link', {
      name: 'logo.svg Invoicer.v1',
    });
    const initialPath = history.location.pathname;

    fireEvent.click(logoLinkNode, leftClick);

    const finalPath = history.location.pathname;

    expect(initialPath).not.toBe(finalPath);
    expect(finalPath).toBe('/');
  });
});
