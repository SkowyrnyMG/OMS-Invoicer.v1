import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  screen,
  waitFor,
  userEvent,
} from 'utils/tests/test-helper';
import SummaryContainer from '../summary-container/summary-container';

const linkClickTest = (linkRegexp, expectedFinalPath) => {
  const { history } = renderWithReduxRouter(
    <SummaryContainer />,
    {},
    { route: '/app' },
  );

  const initialPath = history.location.pathname;
  const orderLink = screen.getByRole('link', {
    name: linkRegexp,
  });

  userEvent.click(orderLink);

  const finalPath = history.location.pathname;

  expect(initialPath).not.toBe(finalPath);
  expect(finalPath).toBe(expectedFinalPath);
};

describe('SummaryContainer', () => {
  test('should render in the document with correct styles', () => {
    snapShotTest(<SummaryContainer />);
  });

  test('should dispaly correct Values of summary containers', async () => {
    renderWithReduxRouter(<SummaryContainer />);

    const counters = screen.getAllByTestId('summaryCounter');
    const [customersCounter, ordersCounter, invoicesCounter] = counters;

    expect(customersCounter).toHaveTextContent(0);
    expect(ordersCounter).toHaveTextContent(0);
    expect(invoicesCounter).toHaveTextContent(0);

    await waitFor(() => {
      counters.forEach((counter) => {
        expect(counter).not.toHaveTextContent(0);
      });
    });

    counters.forEach((counter) => {
      expect(counter).not.toHaveTextContent(0);
    });

    expect(customersCounter).toHaveTextContent(2);
    expect(ordersCounter).toHaveTextContent(1);
    expect(invoicesCounter).toHaveTextContent(1);
  });

  test('should redirect to the orders module after clicking on link placed in order summary box', () => {
    linkClickTest(/view more orders.+/i, '/app/orders');
  });

  test('should redirect to the customers module after clicking on link placed in order summary box', () => {
    linkClickTest(/view more customers.+/i, '/app/customers');
  });

  test('should redirect to the invoices module after clicking on link placed in order summary box', () => {
    linkClickTest(/view more invoices.+/i, '/app/invoices');
  });
});
