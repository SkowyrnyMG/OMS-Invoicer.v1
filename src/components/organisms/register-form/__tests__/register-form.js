import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import RegisterForm from '../register-form';

describe('RegisterForm', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<RegisterForm />);
  });

  test('should not submit the form if required fields are empty', async () => {
    renderWithReduxRouter(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.click(submitButton);

    const errorMsg = await screen.findAllByText(/required.+/i);

    expect(errorMsg.length).not.toBeFalsy();
  });
});
