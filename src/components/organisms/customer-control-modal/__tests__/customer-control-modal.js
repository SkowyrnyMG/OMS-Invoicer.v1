import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  fireEvent,
  leftClick,
  act,
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

  // test('should return new customer data from vies after cussesful request', async () => {
  //   renderWithReduxRouter(
  //     <CustomerControlModal closeModal={handleCloseModal} />,
  //   );

  //   const viesInputNode = screen.getByPlaceholderText('Search in VIES');
  //   const viesSearchButtonNode = screen.getByRole('button', {
  //     name: 'search-icon.svg',
  //   });
  //   const customerNameInput = screen.getByPlaceholderText('Name of Company');

  //   fireEvent.change(viesInputNode, { target: { value: '8822119889' } });
  //   act(() => {
  //     fireEvent.click(viesSearchButtonNode, leftClick);
  //   });

  //   expect(await customerNameInput.value).toBe('test-name');
  // });
});
