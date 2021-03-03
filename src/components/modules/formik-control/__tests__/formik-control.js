import React from 'react';

import {
  renderWithReduxRouter,
  FormikTestWrapper,
  screen,
} from 'utils/tests/test-helper';
import FormikControl from '../formik-control';

describe('FormikControl', () => {
  test('should render input by default', () => {
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikControl type='text' name='name' placeholder='test-placeholder' />
      </FormikTestWrapper>,
    );

    const formikInput = screen.queryByRole('textbox', {
      name: 'test-placeholder',
    });

    expect(formikInput).toBeInTheDocument();
    expect(formikInput.type).toMatch(/text/i);
  });

  test('should render radio button when control has "radio" value ', () => {
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikControl
          type='radio'
          control='radio'
          name='name'
          placeholder='test-placeholder'
          value='test-value'
        />
      </FormikTestWrapper>,
    );

    const radioInput = screen.getByRole('radio', {
      name: 'test-value',
    });

    expect(radioInput).toBeInTheDocument();
    expect(radioInput.type).toMatch(/radio/i);
  });

  test('should render select when control has "select" value ', () => {
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikControl
          type='select'
          control='select'
          name='name'
          placeholder='test-placeholder'
          value='test-value'
          options={['test1', 'test2']}
        />
      </FormikTestWrapper>,
    );

    const selectNode = screen.getByRole('combobox', {
      name: 'test-placeholder',
    });

    expect(selectNode).toBeInTheDocument();
    expect(selectNode.type).toMatch(/select/i);
  });

  test('should render datepicker when control has "date" value ', () => {
    renderWithReduxRouter(
      <FormikTestWrapper>
        <FormikControl
          type='date'
          control='date'
          name='name'
          placeholder='test-placeholder'
        />
      </FormikTestWrapper>,
    );

    const datepickerNode = screen.getByTestId('datepicker');

    expect(datepickerNode).toBeInTheDocument();
  });
});
