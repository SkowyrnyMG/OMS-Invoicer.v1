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
  },
  {
    address: 'TEST ADDRES 2',
    vat_number: '2222222222',
    name: 'TEST NAME 2',
    country: 'PL',
    postCode: '00-000',
    street: 'Test street 2',
    town: 'town2',
    contactEmail: 'test@mail2.pl',
    contactPerson: 'Test Contact 2',
    contactPhone: 'Test phone 2',
  },
];

describe('CustomerModule', () => {
  test('should display in the doucment with correct styles', () => {
    snapShotTest(<CustomersModule customersList={customersListTest} />);
  });

  test('should action menu buttons works correcty', () => {
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
});
