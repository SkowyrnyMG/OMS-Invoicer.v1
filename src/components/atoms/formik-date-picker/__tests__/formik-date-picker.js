import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  FormikTestWrapper,
} from 'utils/tests/test-helper';
import FormikDatePicker from '../formik-date-picker';

describe('FormikDatePicker', () => {
  test('should display in the document with correct styles', () => {
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikDatePicker name='test_date' />
      </FormikTestWrapper>,
    );

    const component = screen.getByTestId('datepicker');

    expect(component).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
