import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import SummaryCounter from '../summary-counter';

describe('SummaryCounter', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<SummaryCounter title='test-title' counter={1} />);
  });
});
