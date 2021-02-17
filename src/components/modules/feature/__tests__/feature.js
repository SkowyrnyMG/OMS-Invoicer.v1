import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import Feature from '../feature';

describe('Feature', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(
      <Feature title='Test feature' counter={1}>
        <div />
      </Feature>,
    );
  });
});
