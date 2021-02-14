import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import ComboInput from '../combo-input';

describe('ComboInput', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<ComboInput />);
  });
});
