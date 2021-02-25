import React from 'react';

import { renderWithReduxRouter, screen } from 'utils/tests/test-helper';
import { getLocalValue } from 'hooks/useLocalStorage';
import FirstConfigModal from '../first-config-modal';

describe('FirstConfigModal', () => {
  test('should display in the document with correct styles', async () => {
    renderWithReduxRouter(<FirstConfigModal />, {}, { route: '/app' });

    console.log(getLocalValue('uuid'));
    const FirstConfigModalNode = await screen.findByTestId(
      'first-config-modal',
    );

    expect(FirstConfigModalNode).toBeInTheDocument();
    expect(FirstConfigModalNode).toMatchSnapshot();
  });

  // test('should not submit form if some required fields are empty', async () => {
  //   setLocalValue('uuid', 'test-uuid');
  //   renderWithReduxRouter(<FirstConfigModal />, {}, { route: '/app' });

  //   await waitFor(() => {
  //     expect(screen.getByPlaceholderText('INVOICE PREFIX')).toBeVisible();
  //   });

  //   const invoicePrefixInput = screen.getByPlaceholderText('INVOICE PREFIX');
  //   const orderPrefixInput = screen.getByPlaceholderText('ORDER PREFIX');
  //   const bankNameInput = screen.getByPlaceholderText('BANK NAME');
  //   const bankAccountNubmerInput = screen.getByPlaceholderText(
  //     'BANK ACCOUNT NUMBER',
  //   );
  //   const ibanInput = screen.getByPlaceholderText('IBAN');
  //   const swiftInput = screen.getByPlaceholderText('SWIFT');
  //   const companyNameInput = screen.getByPlaceholderText('COMPANY NAME');
  //   const vatNumberInput = screen.getByPlaceholderText('VAT NUMBER');
  //   const streetInput = screen.getByPlaceholderText('STREET');
  //   const postCodeInput = screen.getByPlaceholderText('POST CODE');
  //   const townInput = screen.getByPlaceholderText('TOWN');
  //   const countryInput = screen.getByPlaceholderText('COUNTRY');

  //   const submitButtonNode = screen.getByRole('button', { name: 'Save' });

  //   deleteLocalValue('uuid');
  // });

  // TODO TEST edgecases after animation
});
