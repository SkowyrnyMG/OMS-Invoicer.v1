import React from 'react';

import { renderWithReduxRouter, screen } from 'utils/tests/test-helper';
import ViesSearch from '../vies-search';

const handleSetValidation = jest.fn();
const handleSetQueryVat = jest.fn();
const handleSetInitiaals = jest.fn();
const handleSetQueryCode = jest.fn();

describe('ViesSearch', () => {
  test('should display in the document with correct styles', () => {
    renderWithReduxRouter(
      <ViesSearch
        setValidation={handleSetValidation}
        isValid
        setInitialsFn={handleSetInitiaals}
        setQueryVat={handleSetQueryVat}
        queryVat='8822119889'
        setQueryCountryCode={handleSetQueryCode}
        queryCountryCode='PL'
      />,
    );

    const ViesSearchNode = screen.getByTestId('vies-search');

    expect(ViesSearchNode).toBeInTheDocument();
    expect(ViesSearchNode).toMatchSnapshot();
  });
});
