import React from 'react';
import { snapShotTest } from 'utils/tests/test-helper';

import AppBodyContainer from '../app-body-container';

describe('AppBodyContainer', () => {
  test('Should display in document with correct styles', () => {
    snapShotTest(<AppBodyContainer />);
  });
});
