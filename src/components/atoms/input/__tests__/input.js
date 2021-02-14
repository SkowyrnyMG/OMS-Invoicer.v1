import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import Input from '../input';

describe('Input', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<Input />);
  });
});
