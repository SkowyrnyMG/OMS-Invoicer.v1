import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import UserInfo from '../user-info';

describe('UserInfo', () => {
  test('should render in the document with correct styles', () => {
    snapShotTest(<UserInfo>testuser</UserInfo>);
  });
});
