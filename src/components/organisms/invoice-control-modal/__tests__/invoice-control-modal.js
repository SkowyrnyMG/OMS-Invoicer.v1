import React from 'react';

import {
  snapShotTest,
  renderWithReduxRouter,
  screen,
  userEvent,
  // waitFor,
  // waitForElementToBeRemoved,
} from 'utils/tests/test-helper';
import InvoiceControlModal from '../invoice-control-modal';

const mockCloseModal = jest.fn();

describe('Name of the group', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<InvoiceControlModal closeModal={mockCloseModal} />);
  });

  test('should fire closeModal after clicking on "Exit without save" button', () => {
    renderWithReduxRouter(<InvoiceControlModal closeModal={mockCloseModal} />);

    const closeModalButton = screen.getByRole('button', {
      name: 'Exit without save',
    });

    userEvent.click(closeModalButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  // test('should update invoice template with order details after using finised order setter combobox ', async () => {
  //   localStorage.setItem('uuid', 'test-uuid');
  //   renderWithReduxRouter(<InvoiceControlModal closeModal={mockCloseModal} />);

  //   const submitButtonNode = screen.getByRole('button', { name: 'Save' });
  //   const showButtonNode = screen.getByRole('button', { name: 'toggle menu' });
  //   const finishedOrderSetter = screen.getByRole('textbox', {
  //     name: 'Choose a finished order:',
  //   });
  //   const applyFinishedOrderButton = screen.getByRole('button', {
  //     name: /accept/i,
  //   });
  //   userEvent.type(finishedOrderSetter, '22222222');

  //   await waitFor(() =>
  //     expect(
  //       screen.queryByText('TESTORD - 555 EUR - TEST COMPANY NAME'),
  //     ).not.toBeNull(),
  //   );

  //   const result = await screen.findByText(
  //     'TESTORD - 555 EUR - TEST COMPANY NAME',
  //   );
  //   // const test = getbyRole('div', { name: '312312' });
  //   // userEvent.click(applyFinishedOrderButton);
  //   // userEvent.click(showButtonNode);

  //   // expect(screen.findByText('required')).toBeInTheDocument();

  //   // TODO Downshift doesn't show any options after userEvent Type, eventhrough all neccesary data is provided to the comobo boxcomponent (logged while testing)
  // });

  // test('should submit form if all required field have correct value', () => {
  //   renderWithReduxRouter(
  //       <InvoiceControlModal closeModal={mockCloseModal} />
  //   );

  //   // const orderSearchInput = screen.getByRole('input', { name: 'fsd' });
  //   console.log(localStorage.getItem('uuid'));
  // });
});
