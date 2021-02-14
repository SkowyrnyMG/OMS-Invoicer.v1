import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import ErrorMSG from '../error-msg';

describe('ErrorMSG', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<ErrorMSG />);
  });
});
