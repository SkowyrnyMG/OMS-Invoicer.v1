import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import Loader from '../loader';

describe('Loader', () => {
  test('should display in the document with correct styels', () => {
    snapShotTest(<Loader />);
  });
});
