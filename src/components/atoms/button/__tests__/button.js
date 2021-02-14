import React from 'react';
import { snapShotTest } from 'utils/tests/test-helper';

import Button from '../button';

describe('Button', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<Button />);
  });
});
