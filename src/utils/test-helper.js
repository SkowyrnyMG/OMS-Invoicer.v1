import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMemoryHistory } from 'history';
import { theme } from 'themes/theme';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from 'store/store';

const renderWithRedux = (
  ui,
  { store = configureStore({ reducer }), ...renderOptions } = {}
) => {
  const utils = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Provider>,
    renderOptions
  );
  return {
    ...utils,
  };
};

const renderWithRouter = (ui, { route = '/', ...renderOptions } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(
    <Router history={history}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Router>,
    renderOptions
  );
  return {
    ...utils,
    history,
  };
};

const renderWithReduxRouter = (
  ui,
  { store = configureStore({ reducer }), ...reduxRenderOptions } = {},
  { route = '/', ...routerRenderOptions } = {}
) => {
  const renderOptions = {
    ...(reduxRenderOptions || {}),
    ...(routerRenderOptions || {}),
  };
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </Router>
    </Provider>,
    renderOptions
  );
  return {
    ...utils,
    history,
  };
};

const leftClick = { button: 0 };

export * from '@testing-library/react';
export { leftClick, renderWithRouter, renderWithRedux, renderWithReduxRouter };
