import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import ComboboxInvoiceMenu from '../combobox-invoice-menu';

const testItems = [
  {
    customer_vat: 'customer-test-vat',
    customer_name: 'customer-test-name',
    order_number: 'test_order_number',
    price: 500,
    currency: 'EUR',
  },
];

const testSearchResult = 'test_order_number - 500 EUR - customer-test-name';

const testHandleSetItemFn = jest.fn(() =>
  console.log('Values succesfully set to the inputs.'),
);
const testHandleResetItemFn = jest.fn(() =>
  console.log('Values have been reseted!'),
);

describe('ComboboxInvoiceMenu', () => {
  test('should display in the document with correct styles', () => {
    renderWithReduxRouter(
      <ComboboxInvoiceMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    const ComboInvoiceMenuComponent = screen.getByTestId(
      'combobox-invoice-menu',
    );

    expect(ComboInvoiceMenuComponent).toBeInTheDocument();
    expect(ComboInvoiceMenuComponent).toMatchSnapshot();
  });

  test('should not display combo list when search input is untouched', () => {
    renderWithReduxRouter(
      <ComboboxInvoiceMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    const comboList = screen.queryByRole('listbox', {
      name: 'Choose a finished order:',
    });

    expect(comboList).toBeNull();
  });

  test('should display combo list after sucesfull match with search query string and store user choice in combo input', () => {
    renderWithReduxRouter(
      <ComboboxInvoiceMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    // * type search string into search input, after succesful match comboList should be displayed
    let comboInput = screen.getByPlaceholderText(
      /provide order number or company name/i,
    );

    userEvent.type(comboInput, 'customer-test');

    let comboList = screen.queryByRole('listbox', {
      name: 'Choose a finished order:',
    });

    expect(comboList).toBeInTheDocument();
    expect(comboList.children).not.toBeNull();

    const comboListItem = screen.getByRole('option', {
      name: testSearchResult,
    });

    userEvent.click(comboListItem);

    // * after successful option click combolist should dissapear and combo input should receive option value
    comboList = screen.queryByRole('listbox', {
      name: 'Choose a finished order:',
    });
    comboInput = screen.getByPlaceholderText(
      /provide order number or company name/i,
    );

    expect(comboList).toBeNull();
    expect(comboInput.value).toEqual(testSearchResult);
  });

  test('should reset comboInput after click on the reset button', () => {
    renderWithReduxRouter(
      <ComboboxInvoiceMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    const comboInput = screen.getByPlaceholderText(
      /provide order number or company name/i,
    );
    const resetButton = screen.getByRole('button', { name: /reset/i });

    userEvent.type(comboInput, testSearchResult);
    expect(comboInput.value).toEqual(testSearchResult);

    userEvent.click(resetButton);
    expect(comboInput.value).toBeFalsy();
    expect(testHandleResetItemFn).toHaveBeenCalledTimes(1);
  });

  test('should use handleSetItemFn after clicking accept button', () => {
    renderWithReduxRouter(
      <ComboboxInvoiceMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );
    const acceptButton = screen.getByRole('button', { name: /accept/i });

    userEvent.click(acceptButton);

    expect(testHandleSetItemFn).toHaveBeenCalledTimes(1);
  });

  test('should open and close comboList on toggle button click', () => {
    renderWithReduxRouter(
      <ComboboxInvoiceMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
    let comboList = screen.queryByRole('listbox', {
      name: 'Choose a finished order:',
    });

    expect(comboList).toBeNull();

    userEvent.click(toggleButton);

    comboList = screen.queryByRole('listbox', {
      name: 'Choose a finished order:',
    });
    expect(comboList).toBeInTheDocument();

    userEvent.click(toggleButton);
    comboList = screen.queryByRole('listbox', {
      name: 'Choose a finished order:',
    });
    expect(comboList).toBeNull();
  });
});
