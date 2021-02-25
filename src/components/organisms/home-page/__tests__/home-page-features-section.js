import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import HomePageFeaturesSection from '../home-page-features-section/home-page-features-section';

describe('', () => {
  test('should display in the document with correct syles', () => {
    snapShotTest(<HomePageFeaturesSection />);
  });
});
