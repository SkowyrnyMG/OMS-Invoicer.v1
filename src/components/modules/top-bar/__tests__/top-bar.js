import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  TestThemeProvider,
  leftClick,
  renderWithRouter,
} from 'utils/test-helper';
import TopBar from '../top-bar';

describe('TopBar', () => {
  test('should render into document and redirect after using links', () => {
    const { container, getByText, history } = renderWithRouter(
      <TestThemeProvider>
        <TopBar />
      </TestThemeProvider>
    );
    const initialPath = history.location.pathname;
    const topBarContainer = container.firstChild;
    const registerLink = getByText(/sign up/i);
    fireEvent.click(registerLink, leftClick);
    const currentPath = history.location.pathname;

    expect(topBarContainer).toBeInTheDocument();
    expect(currentPath).not.toBe(initialPath);
    expect(currentPath).toContain('/app/register');
  });
});
