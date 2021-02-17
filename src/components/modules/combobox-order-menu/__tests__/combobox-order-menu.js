import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  fireEvent,
  leftClick,
} from 'utils/tests/test-helper';
import ComboboxOrderMenu from '../combobox-order-menu';

const testItems = [
  {
    vat_number: 'customer-test-vat',
    name: 'customer-test-name',
  },
];

const testSearchResult = 'customer-test-vat - customer-test-name';

const testHandleSetItemFn = jest.fn(() =>
  console.log('Values succesfully set to the inputs.'),
);
const testHandleResetItemFn = jest.fn(() =>
  console.log('Values have been reseted!'),
);

describe('ComboboxOrderMenu', () => {
  test('should display in the document with correct styles', () => {
    renderWithReduxRouter(
      <ComboboxOrderMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    const ComboInvoiceMenuComponent = screen.getByTestId('combobox-order-menu');

    expect(ComboInvoiceMenuComponent).toBeInTheDocument();
    expect(ComboInvoiceMenuComponent).toMatchSnapshot();
  });

  test('should not display combo list when search input is untouched', () => {
    renderWithReduxRouter(
      <ComboboxOrderMenu
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
      <ComboboxOrderMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    // * type search string into search input, after succesful match comboList should be displayed
    let comboInput = screen.getByPlaceholderText(/type a Customer name/i);

    fireEvent.change(comboInput, { target: { value: 'customer-test' } });

    let comboList = screen.queryByRole('listbox', {
      name: 'Choose a Customer:',
    });

    expect(comboList).toBeInTheDocument();
    expect(comboList.children).not.toBeNull();

    const comboListItem = screen.getByRole('option', {
      name: testSearchResult,
    });

    fireEvent.click(comboListItem, leftClick);

    // * after successful option click combolist should dissapear and combo input should receive option value
    comboList = screen.queryByRole('listbox', {
      name: 'Choose a finished order:',
    });
    comboInput = screen.getByPlaceholderText(/type a Customer name../i);

    expect(comboList).toBeNull();
    expect(comboInput.value).toEqual(testSearchResult);
  });

  test('should reset comboInput after click on the reset button', () => {
    renderWithReduxRouter(
      <ComboboxOrderMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );

    const comboInput = screen.getByPlaceholderText(/type a Customer name../i);
    const resetButton = screen.getByRole('button', { name: /reset/i });

    fireEvent.change(comboInput, { target: { value: testSearchResult } });
    expect(comboInput.value).toEqual(testSearchResult);

    fireEvent.click(resetButton, leftClick);
    expect(comboInput.value).toBeFalsy();
    expect(testHandleResetItemFn).toHaveBeenCalledTimes(1);
  });

  test('should use handleSetItemFn after clicking accept button', () => {
    renderWithReduxRouter(
      <ComboboxOrderMenu
        items={testItems}
        handleSetItemFn={testHandleSetItemFn}
        handleResetItemFn={testHandleResetItemFn}
      />,
    );
    const acceptButton = screen.getByRole('button', { name: /accept/i });

    fireEvent.click(acceptButton, leftClick);

    expect(testHandleSetItemFn).toHaveBeenCalledTimes(1);
  });
});
