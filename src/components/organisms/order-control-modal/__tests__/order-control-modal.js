import React from 'react';

import {
  renderWithReduxRouter,
  userEvent,
  screen,
  waitFor,
} from 'utils/tests/test-helper';
import { server } from 'utils/tests/server';
import { rest } from 'msw';
import OrderControlModal from '../order-control-modal';

const mockCloseModal = jest.fn();

describe('OrderControlModal', () => {
  test('should display in the document with correct styles', () => {
    const { container } = renderWithReduxRouter(
      <OrderControlModal closeModal={mockCloseModal} />,
    );

    const OrderControlModalNode = container.firstChild;

    expect(OrderControlModalNode).toBeInTheDocument();
  });

  test('should fire close modal function when clicked on "Exit without save" button', async () => {
    renderWithReduxRouter(<OrderControlModal closeModal={mockCloseModal} />);

    const closeModalButtonNode = screen.getByRole('button', {
      name: /exit without save/i,
    });

    userEvent.click(closeModalButtonNode);

    const uniqueHeading = await screen.findByText('Order details');

    expect(uniqueHeading).toBeInTheDocument();
  });

  test('should display warningPopup if there are any finished orders avaliable', async () => {
    const { history } = renderWithReduxRouter(
      <OrderControlModal closeModal={mockCloseModal} />,
      {},
      { route: 'app/orders' },
    );

    server.use(
      rest.get(
        'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/customers.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}));
        },
      ),
    );

    const initialPath = history.location.pathname;
    const warningPopupNode = screen.getByTestId('warning-popup');

    await waitFor(() => {
      expect(warningPopupNode).toHaveStyle('visibility: inherit');
    });

    const orderGoToLink = await screen.findByText('customers tab');

    userEvent.click(orderGoToLink);

    const finalPath = history.location.pathname;

    expect(initialPath).not.toBe(finalPath);
    expect(finalPath).toBe('/app/customers');
  });
});
