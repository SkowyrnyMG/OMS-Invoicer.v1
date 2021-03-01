import React from 'react';

import {
  renderWithReduxRouter,
  snapShotTest,
  userEvent,
  screen,
} from 'utils/tests/test-helper';
import OrderControlModal from '../order-control-modal';

const mockCloseModal = jest.fn();

describe('OrderControlModal', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<OrderControlModal closeModal={mockCloseModal} />);
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
});
