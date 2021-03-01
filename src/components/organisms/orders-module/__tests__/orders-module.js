import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import OrdersModule from '../orders-module';

const testOrdersList = [
  {
    currency: 'EUR',
    customer_address: 'STREET 11, 00-000, TWON, PL,',
    customer_name: 'TEST COMPANY NAME',
    customer_vat: '2222222222',
    desc: 'fsdafsad',
    email: '',
    finish_date: '2021-02-24T23:00:00.000Z',
    order_number: 'TESTORD',
    price: 555,
    status: 'in progress',
    tax: 23,
  },
];

describe('OrdersModule', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<OrdersModule ordersList={testOrdersList} />);
  });

  test('should action buttons display correctly', () => {
    renderWithReduxRouter(<OrdersModule ordersList={testOrdersList} />);

    const editButtonNode = screen.getByRole('button', { name: /edit/i });
    const cancelButtonNode = screen.getByRole('button', { name: /cancel/i });
    const finishOrderButtonNode = screen.getByRole('button', {
      name: /finish order/i,
    });
    const addNewButtonNode = screen.getByRole('button', { name: /add new/i });
    const positionName = screen.getByText('TESTORD');

    expect(editButtonNode).toBeDisabled();
    expect(cancelButtonNode).toBeDisabled();
    expect(finishOrderButtonNode).toBeDisabled();

    userEvent.click(positionName);

    expect(editButtonNode).not.toBeDisabled();
    expect(cancelButtonNode).not.toBeDisabled();
    expect(finishOrderButtonNode).not.toBeDisabled();
    expect(addNewButtonNode).not.toBeDisabled();
  });

  test('should open empty order-control-modal if clicked on add new button and close it when clicked on Exit without save button', async () => {
    renderWithReduxRouter(<OrdersModule ordersList={testOrdersList} />);

    const addNewButtonNode = screen.getByRole('button', { name: /add new/i });

    userEvent.click(addNewButtonNode);

    const modalCompanyNameInput = await screen.findByPlaceholderText(
      'CUSTOMER NAME',
    );
    const closeModalButtonNode = await screen.findByRole('button', {
      name: /exit without save/i,
    });

    expect(modalCompanyNameInput).toBeInTheDocument();
    expect(modalCompanyNameInput).not.toHaveValue();

    userEvent.click(closeModalButtonNode);

    expect(modalCompanyNameInput).not.toBeInTheDocument();
  });

  test('should open choosen position in invoice-control-modal if clicked on edit button and close on Exit without save button', async () => {
    renderWithReduxRouter(<OrdersModule ordersList={testOrdersList} />);

    const editButtonNode = screen.getByRole('button', { name: /edit/i });
    const positionName = screen.getByText('TESTORD');

    userEvent.click(positionName);
    userEvent.click(editButtonNode);

    const modalCompanyNameInput = await screen.findByPlaceholderText(
      'CUSTOMER NAME',
    );
    const closeModalButtonNode = await screen.findByRole('button', {
      name: /exit without save/i,
    });

    expect(modalCompanyNameInput).toBeInTheDocument();
    expect(modalCompanyNameInput).toHaveValue('TEST COMPANY NAME');

    userEvent.click(closeModalButtonNode);

    expect(modalCompanyNameInput).not.toBeInTheDocument();
  });
});
