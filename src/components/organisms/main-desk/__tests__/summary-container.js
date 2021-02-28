import React from 'react';

import { renderWithReduxRouter, snapShotTest } from 'utils/tests/test-helper';
import SummaryContainer from '../summary-container/summary-container';

describe('SummaryContainer', () => {
  test('should render in the document with correct styles', () => {
    snapShotTest(<SummaryContainer />);
  });

  test('should dispaly correct Values of summary containers', async () => {
    renderWithReduxRouter(<SummaryContainer />);
    // TODO figure out how to wait for async calls in this component
  });
});
