import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import MenuDesktop from '../menu-desktop';

describe('MenuDesktop', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<MenuDesktop />);
  });
});
