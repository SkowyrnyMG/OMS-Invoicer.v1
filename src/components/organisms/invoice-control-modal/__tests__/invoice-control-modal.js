import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  userEvent,
  waitFor,
} from 'utils/tests/test-helper';
import { server } from 'utils/tests/server';
import { rest } from 'msw';
import InvoiceControlModal from '../invoice-control-modal';

const mockCloseModal = jest.fn();

describe('Name of the group', () => {
  test('should display in the document with correct styles', async () => {
    const { container } = renderWithReduxRouter(
      <InvoiceControlModal closeModal={mockCloseModal} />,
    );

    const InvoiceControlModalNode = container.firstChild;

    expect(InvoiceControlModalNode).toBeInTheDocument();
  });

  test('should fire closeModal after clicking on "Exit without save" button', () => {
    renderWithReduxRouter(<InvoiceControlModal closeModal={mockCloseModal} />);

    const closeModalButton = screen.getByRole('button', {
      name: 'Exit without save',
    });

    userEvent.click(closeModalButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('should display warningPopup if there are any finished orders avaliable', async () => {
    const { history } = renderWithReduxRouter(
      <InvoiceControlModal closeModal={mockCloseModal} />,
      {},
      { route: 'app/invoices' },
    );

    server.use(
      rest.get(
        'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/orders.json',
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              firstReg: {
                TESTORD: {
                  currency: 'EUR',
                  customer_address: 'STREET 11, 00-000, TWON, PL,',
                  customer_name: 'TEST COMPANY NAME',
                  customer_vat: '2222222222',
                  desc: 'fsdafsad',
                  email: '',
                  finish_date: new Date(2021, 1, 30),
                  order_number: 'TESTORD',
                  price: 555,
                  status: 'in progress',
                  tax: 23,
                },
              },
              lastOrder: '',
            }),
          );
        },
      ),
    );

    const initialPath = history.location.pathname;
    const warningPopupNode = screen.getByTestId('warning-popup');

    await waitFor(() => {
      expect(warningPopupNode).toHaveStyle('visibility: inherit');
    });

    const orderGoToLink = await screen.findByText('orders tab');

    userEvent.click(orderGoToLink);

    const finalPath = history.location.pathname;

    expect(initialPath).not.toBe(finalPath);
    expect(finalPath).toBe('/app/orders');
  });
});
