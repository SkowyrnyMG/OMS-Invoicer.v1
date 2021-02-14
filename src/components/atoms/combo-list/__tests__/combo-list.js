import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import ComboList from '../combo-list';

describe('ComboList', () => {
  test('should display in the document with correct styels', () => {
    snapShotTest(<ComboList />);
  });
});
