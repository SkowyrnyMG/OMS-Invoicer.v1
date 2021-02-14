import React from 'react';
import {
  renderWithReduxRouter,
  //  fireEvent, leftClick
} from 'utils/tests/test-helper';
// import { routes } from 'utils/routes';
// import { auth } from 'firebase.config';
import Login from '../login';

describe('Login page', () => {
  test('should render into document', () => {
    const { container } = renderWithReduxRouter(<Login />);
    const loginPageContainer = container.firstChild;

    expect(loginPageContainer).toBeInTheDocument();
  });

  // test('should redirect to app page after successful login form submit', async () => {
  //   const {
  //     getByText,
  //     // getByTestId,
  //     getByPlaceholderText,
  //     history,
  //   } = renderWithReduxRouter(<Login />, {}, { route: '/login' });

  //   const initialPath = history.location.pathname;
  //   const emailInput = getByPlaceholderText(/email/i);
  //   const passwordInput = getByPlaceholderText(/password/i);
  //   const submitButton = getByText(/submit/i);
  //   console.log(initialPath);

  //   fireEvent.change(emailInput, { target: { value: 'mat.gruzla@gmail.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'mat.admin.!@312#' } });
  //   fireEvent.click(submitButton, leftClick);

  //   const currentPath = history.location.pathname;
  //   console.log('itsme');
  //   console.log(currentPath);

  //   // const pathAfterSucces = history.location.pathname;
  //   // expect(await getByText(/success/i)).toBeInTheDocument();
  // });
  // test('should redirect to app page after successful login form submit', async () => {
  //   const {
  //     getByText,
  //     // getByTestId,
  //     getByPlaceholderText,
  //     history,
  //   } = renderWithReduxRouter(<Login />, {}, { route: '/login' });

  //   const initialPath = history.location.pathname;
  //   const emailInput = getByPlaceholderText(/email/i);
  //   const passwordInput = getByPlaceholderText(/password/i);
  //   const submitButton = getByText(/submit/i);
  //   console.log(initialPath);

  //   fireEvent.change(emailInput, 'mat.gruzla@gmail.com');
  //   fireEvent.change(passwordInput, 'mat.admin.!@312#');
  //   fireEvent.click(submitButton, leftClick);

  //   await jest.advanceTimersByTime(10000);
  //   const currentPath = history.location.pathname;
  //   console.log('itsme');
  //   console.log(currentPath);

  //   // const pathAfterSucces = history.location.pathname;
  //   // expect(await getByText(/success/i)).toBeInTheDocument();
  // });
});
