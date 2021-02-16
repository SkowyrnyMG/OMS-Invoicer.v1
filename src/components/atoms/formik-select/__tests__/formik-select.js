import React from 'react';

import {
  renderWithReduxRouter,
  FormikTestWrapper,
  screen,
} from 'utils/tests/test-helper';
import FormikSelect from '../formik-select';

describe('FormikSelect', () => {
  test('should render into document with correct styles', () => {
    const options = ['test-option-1', 'test-option-2'];
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikSelect name='test-select' options={options} />
      </FormikTestWrapper>,
    );

    const component = screen.getByTestId('formik-select');

    expect(component).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
