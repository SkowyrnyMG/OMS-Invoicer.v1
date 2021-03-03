import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import ConfigForm from '../config-form';

const onSubmitMock = jest.fn();

describe('ConfigForm', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<ConfigForm onSubmit={onSubmitMock} />);
  });

  test('should not submit the form if required fields are empty', async () => {
    renderWithReduxRouter(<ConfigForm onSubmit={onSubmitMock} />);

    const submitButtonNode = screen.getByRole('button', { name: /save/i });

    userEvent.click(submitButtonNode);

    // * display Require error fields instead of submiting the form
    expect(await screen.findAllByText(/required/i)).toBeTruthy();
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
  });
});
