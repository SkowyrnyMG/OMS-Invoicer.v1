import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import HeadingBlue from '../heading-blue';

describe('HeadingBlue', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<HeadingBlue />);
  });
});
