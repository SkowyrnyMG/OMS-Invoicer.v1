import React from 'react';

import {
  renderWithReduxRouter,
  FormikTestWrapper,
  screen,
} from 'utils/tests/test-helper';
import FormikInput from '../formik-input';

describe('FormikInput', () => {
  test('should display in the document with correct styles', () => {
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikInput
          type='text'
          name='test_input'
          placeholder='test formik input'
        />
      </FormikTestWrapper>,
    );

    const component = screen.getByTestId('formik-input');

    expect(component).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
