import React from 'react';

import {
  renderWithReduxRouter,
  FormikTestWrapper,
  screen,
  snapShotTest,
  fireEvent,
  leftClick,
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

    fireEvent.click(backButton, leftClick);
    const finalPath = history.location.pathname;

    expect(backButton).toBeInTheDocument();
    expect(initialPath).not.toEqual(finalPath);
    expect(initialPath).toBe('/login');
    expect(finalPath).toBe('/');
  });
});
