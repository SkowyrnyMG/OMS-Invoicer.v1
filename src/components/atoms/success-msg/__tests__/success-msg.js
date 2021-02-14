import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import SuccessMSG from '../success-msg';

describe('SuccessMSG', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<SuccessMSG />);
  });
});
