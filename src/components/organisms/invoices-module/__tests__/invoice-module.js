import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  userEvent,
  screen,
} from 'utils/tests/test-helper';
import InvoiceModule from '../invoices-module';

const testInvoiceList = [
  {
    currency: 'EUR',
    customer_address: 'TEST STREET, 00-000, TOWN, PL,',
    customer_name: 'TEST COMPANYNAME',
    customer_vat: 'PL2222222222',
    desc: 'This is test description',
    invoice_number: 'TESTINV-1',
    issue_date: '2021-02-03',
    left_to_pay: 0,
    order_number: 'TESTORD-1',
    payment_status: 'unpaid',
    payment_value: 0,
    price_gross: 615,
    price_net: 500,
    sale_date: '2021-02-04',
    tax: 23,
    terms: 7,
  },
];

describe('InvoiceModule', () => {
  test('should render in the document with correct styles', () => {
    snapShotTest(<InvoiceModule invoicesList={testInvoiceList} />);
  });

  test('should action buttons display correctly', () => {
    renderWithReduxRouter(<InvoiceModule invoicesList={testInvoiceList} />);

    const editButtonNode = screen.getByRole('button', { name: /edit/i });
    const cancelButtonNode = screen.getByRole('button', { name: /cancel/i });
    const markAsPaidButtonNode = screen.getByRole('button', {
      name: /mark as paid/i,
    });
    const printButtonNode = screen.getByRole('button', { name: /print/i });
    const addNewButtonNode = screen.getByRole('button', { name: /add new/i });
    const positionName = screen.getByText('TESTINV-1');

    expect(editButtonNode).toBeDisabled();
    expect(cancelButtonNode).toBeDisabled();
    expect(markAsPaidButtonNode).toBeDisabled();
    expect(printButtonNode).toBeDisabled();

    userEvent.click(positionName);

    expect(editButtonNode).not.toBeDisabled();
    expect(cancelButtonNode).not.toBeDisabled();
    expect(markAsPaidButtonNode).not.toBeDisabled();
    expect(printButtonNode).not.toBeDisabled();
    expect(addNewButtonNode).not.toBeDisabled();
  });

  test('should open empty invoice-control-modal if clicked on add new button and close it when clicked on Exit without save button', async () => {
    renderWithReduxRouter(<InvoiceModule invoicesList={testInvoiceList} />);

    const addNewButtonNode = screen.getByRole('button', { name: /add new/i });

    userEvent.click(addNewButtonNode);

    const modalCompanyNameInput = await screen.findByPlaceholderText(
      /customer name/i,
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
    renderWithReduxRouter(<InvoiceModule invoicesList={testInvoiceList} />);

    const editButtonNode = screen.getByRole('button', { name: /edit/i });
    const positionName = screen.getByText('TESTINV-1');

    userEvent.click(positionName);
    userEvent.click(editButtonNode);

    const modalCompanyNameInput = await screen.findByPlaceholderText(
      /customer name/i,
    );
    const closeModalButtonNode = await screen.findByRole('button', {
      name: /exit without save/i,
    });

    expect(modalCompanyNameInput).toBeInTheDocument();
    expect(modalCompanyNameInput).toHaveValue('TEST COMPANYNAME');

    userEvent.click(closeModalButtonNode);

    expect(modalCompanyNameInput).not.toBeInTheDocument();
  });
});

// TODO MODAL open close tests need too be added. Other integration tests will be created in invoice view tests.
