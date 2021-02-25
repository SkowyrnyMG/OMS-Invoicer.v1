import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import InvoiceControlModal from '../invoice-control-modal';

const mockCloseModal = jest.fn();

describe('Name of the group', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<InvoiceControlModal closeModal={mockCloseModal} />);
  });
});
