import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import PatternSection from '../pattern-section';

describe('PatternSection', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(
      <PatternSection patternUrl='https://somelinkwithpattern.com'>
        <div />
      </PatternSection>,
    );
  });
});
