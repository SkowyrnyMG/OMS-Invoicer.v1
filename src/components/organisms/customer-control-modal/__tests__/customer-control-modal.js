import React from 'react';
import { server } from 'utils/tests/server';
import { rest } from 'msw';

import {
  renderWithReduxRouter,
  screen,
  userEvent,
  waitFor,
} from 'utils/tests/test-helper';

import CustomerControlModal from '../customer-control-modal';

const handleCloseModal = jest.fn();

describe('CustomerControlModal', () => {
  test('should dislay in the document with correct styles', () => {
    const { container } = renderWithReduxRouter(
      <CustomerControlModal closeModal={handleCloseModal} />,
    );

    const CustomerControlModalNode = container.firstChild;

    expect(CustomerControlModalNode).toBeInTheDocument();
    expect(CustomerControlModalNode).toMatchSnapshot();
  });

  test('should return new customer data from vies after cussesful request', async () => {
    renderWithReduxRouter(
      <CustomerControlModal closeModal={handleCloseModal} />,
    );

    const viesInputNode = screen.getByPlaceholderText('Search in VIES');
    const viesSearchButtonNode = screen.getByRole('button', {
      name: 'search-icon.svg',
    });
    const customerNameInput = screen.getByPlaceholderText('Name of Company');
    const vatInput = screen.getByPlaceholderText('VAT');
    const countryInput = screen.getByPlaceholderText('Country');
    const streetInput = screen.getByPlaceholderText('Street');
    const townInput = screen.getByPlaceholderText('Town');
    const postCodeInput = screen.getByPlaceholderText('Post-code');

    userEvent.type(viesInputNode, '8822119889');

    userEvent.click(viesSearchButtonNode);

    await waitFor(() => {
      expect(customerNameInput).toHaveValue();
      expect(vatInput).toHaveValue();
      expect(countryInput).toHaveValue();
      expect(streetInput).toHaveValue();
      expect(townInput).toHaveValue();
      expect(postCodeInput).toHaveValue();
    });

    expect(customerNameInput).toHaveValue('TEST COMPANY NAME');
    expect(vatInput).toHaveValue('PL8822119889');
    expect(countryInput).toHaveValue('PL');
    expect(streetInput).toHaveValue('TEST STREET 25A');
    expect(townInput).toHaveValue('TOWN');
    expect(postCodeInput).toHaveValue('PL00000');
  });

  test('should display error message if user check unvalid VAT ID', async () => {
    renderWithReduxRouter(
      <CustomerControlModal closeModal={handleCloseModal} />,
    );

    server.use(
      rest.get('/api/verify', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              address: '---',
              countryCode: 'PL',
              name: '---',
              requestDate: '2021-02-23+01:00',
              valid: false,
              vatNumber: '5522256598',
            },
          }),
        );
      }),
    );

    const viesInputNode = screen.getByPlaceholderText('Search in VIES');
    const viesSearchButtonNode = screen.getByRole('button', {
      name: 'search-icon.svg',
    });

    userEvent.type(viesInputNode, '5522256598');
    userEvent.click(viesSearchButtonNode);

    expect(
      await screen.findByText(
        `Your customer's VAT number is not valid/active!`,
      ),
    ).toBeInTheDocument();
  });

  test("should throw error messages on submit attempt if required fields doesn't have value", async () => {
    renderWithReduxRouter(
      <CustomerControlModal closeModal={handleCloseModal} />,
    );

    const customerNameInput = screen.getByPlaceholderText('Name of Company');
    const vatInput = screen.getByPlaceholderText('VAT');
    const countryInput = screen.getByPlaceholderText('Country');
    const streetInput = screen.getByPlaceholderText('Street');
    const townInput = screen.getByPlaceholderText('Town');
    const postCodeInput = screen.getByPlaceholderText('Post-code');
    const taxInput = screen.getByPlaceholderText('TAX');
    const submitButtonNode = screen.getByRole('button', { name: 'Save' });

    userEvent.type(customerNameInput, 'TEST CUSTOMER NAME');
    userEvent.type(vatInput, '552233114');
    userEvent.type(countryInput, 'TEST COUNTRY');
    userEvent.type(streetInput, 'TEST STREET');
    userEvent.type(townInput, 'TOWN INPUT');
    userEvent.type(postCodeInput, '00-000');
    userEvent.click(submitButtonNode);

    expect(taxInput).not.toHaveValue();
    // * Tax field is last required empty field
    expect(
      await screen.findByText(/Tax field is required!/i),
    ).toBeInTheDocument();
  });

  test('should handle close modal function after clicking on Exit without save button', () => {
    renderWithReduxRouter(
      <CustomerControlModal closeModal={handleCloseModal} />,
    );

    const closeModalButtonNode = screen.getByRole('button', {
      name: 'Exit without save',
    });

    userEvent.click(closeModalButtonNode);

    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
});
