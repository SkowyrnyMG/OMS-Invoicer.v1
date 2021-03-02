import React from 'react';

import {
  renderWithReduxRouter,
  FormikTestWrapper,
  screen,
  snapShotTest,
  userEvent,
} from 'utils/tests/test-helper';
import AuthFormWrapper from '../auth-form-wrapper';

describe('AuthFormWrapper', () => {
  test('should render in the document with correct styles', () => {
    snapShotTest(
      <FormikTestWrapper>
        <AuthFormWrapper title='test_title'>
          <div />
        </AuthFormWrapper>
      </FormikTestWrapper>,
    );
  });

  test('should redirect to home page after clicking back button', () => {
    const { history } = renderWithReduxRouter(
      <FormikTestWrapper>
        <AuthFormWrapper title='test_title'>
          <div />
        </AuthFormWrapper>
      </FormikTestWrapper>,
      {},
      { route: '/login' },
    );

    const initialPath = history.location.pathname;
    const backButton = screen.getByRole('link', {
      name: 'Take me from here!',
    });

    userEvent.click(backButton);
    const finalPath = history.location.pathname;

    expect(backButton).toBeInTheDocument();
    expect(initialPath).not.toEqual(finalPath);
    expect(initialPath).toBe('/login');
    expect(finalPath).toBe('/');
  });
});
