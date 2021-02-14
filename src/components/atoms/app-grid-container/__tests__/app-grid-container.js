import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import AppGridContainer from '../app-grid-container';

describe('AppGridContainer', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<AppGridContainer />);
  });
});
