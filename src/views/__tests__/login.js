import React from 'react';
import {
  renderWithReduxRouter,
  // fireEvent,
  // leftClick,
  // screen,
  // act,
} from 'utils/test-helper';
// import { routes } from 'utils/routes';
// import { auth } from 'firebase.config';
import Login from '../login';

jest.mock('../../firebase.config.js');

describe('Login page', () => {
  test('should render into document', () => {
    const { container } = renderWithReduxRouter(<Login />);
    const loginPageContainer = container.firstChild;

    expect(loginPageContainer).toBeInTheDocument();
  });

  // test('should redirect to app page after successful login form submit', async () => {
  //   const {
  //     getByText,
  //     getByTestId,
  //     getByPlaceholderText,
  //     history,
  //   } = renderWithReduxRouter(<Login />, {}, { route: '/login' });
  //   const initialPath = history.location.pathname;
  //   const emailInput = getByPlaceholderText(/email/i);
  //   const passwordInput = getByPlaceholderText(/password/i);
  //   const submitButton = getByText(/submit/i);

  //   auth.signInWithEmailAndPassword.mockImplementationOnce(() =>
  //     Promise.resolve({
  //       user: {
  //         uid: 'userID',
  //       },
  //     })
  //   );

  //   fireEvent.change(emailInput, 'mat.gruzla@gmail.com');
  //   fireEvent.change(passwordInput, 'mat.admin.!@312#');
  //   fireEvent.click(submitButton, leftClick);

  //   const pathAfterSucces = history.location.pathname;
  //   console.log(pathAfterSucces);
  //   const response = await auth.signInWithEmailAndPassword;
  //   console.log(response);
  //   expect(auth.signInWithEmailAndPassword).toBeCalledTimes(1);
  //   // expect(await getByText(/success/i)).toBeInTheDocument();
  // });
});
