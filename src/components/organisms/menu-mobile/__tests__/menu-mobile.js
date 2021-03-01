import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import MenuMobile from '../menu-mobile';

describe('MenuMobile', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(<MenuMobile />);
  });
});

// * hamburger button is not tested, beceause jsdom does not allow us to test different screen sizes
