import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMemoryHistory } from 'history';
import { Formik, Form } from 'formik';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';

import { theme } from 'themes/theme';
import { reducer } from 'store/store';

const leftClick = { button: 0 };

const FormikTestWrapper = ({ children }) => (
  <Formik>{() => <Form>{children}</Form>}</Formik>
);

const renderWithRedux = (
  ui,
  { store = configureStore({ reducer }), ...renderOptions } = {},
) => {
  const utils = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Provider>,
    renderOptions,
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
    renderOptions,
  );
  return {
    ...utils,
    history,
  };
};

const makeStore = () => {
  return configureStore({ reducer });
};

const renderWithReduxRouter = (
  ui,
  { store = Store, ...reduxRenderOptions } = {},
  { route = '/', ...routerRenderOptions } = {},
) => {
  const renderOptions = {
    ...(reduxRenderOptions || {}),
    ...(routerRenderOptions || {}),
  };
  const history = createMemoryHistory({ initialEntries: [route] });

  const utils = render(
    <Provider store={store || makeStore()}>
      <Router history={history}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </Router>
    </Provider>,
    renderOptions,
  );

  return {
    ...utils,
    history,
  };
};

const snapShotTest = (componentToRender) => {
  const { container } = renderWithReduxRouter(componentToRender);
  const component = container.firstChild;

  expect(component).toBeInTheDocument();
  expect(component).toMatchSnapshot();
};

export * from '@testing-library/react';
export {
  leftClick,
  renderWithRouter,
  renderWithRedux,
  renderWithReduxRouter,
  snapShotTest,
  FormikTestWrapper,
};
