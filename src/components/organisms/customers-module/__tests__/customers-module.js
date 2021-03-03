import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import CustomersModule from '../customers-module';

const customersListTest = [
  {
    address: 'TEST ADDRES 1',
    vat_number: '1111111111',
    name: 'TEST NAME 1',
    country: 'PL',
    postCode: '00-000',
    street: 'Test street 1',
    town: 'town1',
    contactEmail: 'test@mail1.pl',
    contactPerson: 'Test Contact 1',
    contactPhone: 'Test phone 1',
    tax: 23,
  },
  {
    address: 'TEST ADDRES 2',
    name: 'TEST NAME 2',
    vat_number: '2222222222',
    country: 'PL',
    town: 'town2',
    street: 'Test street 2',
    postCode: '00-000',
    contactEmail: 'test@mail2.pl',
    contactPerson: 'Test Contact 2',
    contactPhone: 'Test phone 2',
    tax: 23,
  },
];

describe('CustomerModule', () => {
  test('should display in the doucment with correct styles', () => {
    snapShotTest(<CustomersModule customersList={customersListTest} />);
  });

  test('should action menu edit and delete buttons works correcty', async () => {
    renderWithReduxRouter(
      <CustomersModule customersList={customersListTest} />,
    );

    const editButtonNode = screen.getByRole('button', { name: /edit/i });
    const deleteButtonNode = screen.getByRole('button', { name: /delete/i });
    const positionName = screen.getByText('TEST NAME 2');

    expect(editButtonNode).toBeDisabled();
    expect(deleteButtonNode).toBeDisabled();

    userEvent.click(positionName);

    expect(editButtonNode).not.toBeDisabled();
    expect(deleteButtonNode).not.toBeDisabled();
  });

  test('should open customer-contol-modal with selected customer data after clicking on "Edit" button', () => {
    renderWithReduxRouter(
      <CustomersModule customersList={customersListTest} />,
    );

    const editButtonNode = screen.getByRole('button', { name: /edit/i });
    const positionName = screen.getByText('TEST NAME 2');

    expect(editButtonNode).toBeDisabled();

    userEvent.click(positionName);

    expect(editButtonNode).not.toBeDisabled();

    userEvent.click(editButtonNode);

    expect(screen.getByPlaceholderText('Name of Company')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name of Company')).toHaveValue(
      'TEST NAME 2',
    );
  });

  test('should display delete button as disabled until position is selected', async () => {
    renderWithReduxRouter(
      <CustomersModule customersList={customersListTest} />,
    );

    const deleteButtonNode = screen.getByRole('button', { name: /delete/i });
    const positionName = screen.getByText('TEST NAME 2');

    expect(deleteButtonNode).toBeDisabled();

    userEvent.click(positionName);

    expect(deleteButtonNode).not.toBeDisabled();
  });

  test('should open customer-contol-modal after clicking on "New Customer"', async () => {
    renderWithReduxRouter(
      <CustomersModule customersList={customersListTest} />,
    );

    const addNewButtonNode = screen.getByRole('button', { name: /add new/i });

    userEvent.click(addNewButtonNode);

    expect(await screen.findByText('Base company details')).toBeInTheDocument();
  });
});
