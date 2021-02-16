import React from 'react';

import {
  renderWithReduxRouter,
  FormikTestWrapper,
  screen,
} from 'utils/tests/test-helper';
import FormikRadio from '../formik-radio';

describe('FormikRadio', () => {
  test('should display in the document with correct styles', () => {
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikRadio name='test_radio' value='test_value' />
      </FormikTestWrapper>,
    );

    const component = screen.getByRole('textbox', { name: 'test_value' });

    expect(component).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
