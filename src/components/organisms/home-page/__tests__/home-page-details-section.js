import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import HomePageDetailsSection from '../home-page-details-section/home-page-details-section';

describe('HomePageDetailsSection', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<HomePageDetailsSection />);
  });
});
