import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import ComboButton from '../combo-button';

describe('ComboButton', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<ComboButton />);
  });
});
