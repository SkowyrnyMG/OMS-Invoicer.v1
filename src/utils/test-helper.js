import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMemoryHistory } from 'history';
import { theme } from 'themes/theme';

export const TestThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithRouter = (ui, { route = '/', ...renderOptions } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions);
  return {
    ...utils,
    history,
  };
};

const leftClick = { button: 0 };

export { leftClick, renderWithRouter, fireEvent };
