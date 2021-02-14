import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import NavLink from '../nav-link';

describe('NavLink', () => {
  test('should display login link in the document with correct styles', () => {
    snapShotTest(
      <NavLink path='/' linktype='login'>
        Login
      </NavLink>,
    );
  });
  test('should display logout link in the document with correct styles', () => {
    snapShotTest(
      <NavLink path='/' linktype='logout'>
        Login
      </NavLink>,
    );
  });
});
