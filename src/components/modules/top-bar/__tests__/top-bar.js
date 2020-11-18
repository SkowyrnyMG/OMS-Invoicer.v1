import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  TestThemeProvider,
  leftClick,
  renderWithRouter,
} from 'utils/test-helper';
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
    const { container } = renderWithRouter(
      <TestThemeProvider>
        <TopBar />
      </TestThemeProvider>
    );
    const topBarContainer = container.firstChild;

    expect(topBarContainer).toBeInTheDocument();
  });

  test('should redirect to register page after click on Sign up link', () => {
    const { getByText, history } = renderWithRouter(
      <TestThemeProvider>
        <TopBar />
      </TestThemeProvider>
    );

    const linkRegex = /sign up/i;
    const REGISTER_LINK = '/app/register';

    linkChecker(history, getByText, REGISTER_LINK, linkRegex);
  });

  test('should redirect to login page after click on Sign in link', () => {
    const { getByText, history } = renderWithRouter(
      <TestThemeProvider>
        <TopBar />
      </TestThemeProvider>
    );

    const linkRegex = /sign in/i;
    const LOGIN_LINK = '/app/login';

    linkChecker(history, getByText, LOGIN_LINK, linkRegex);
  });
});
