import React from 'react';

import { snapShotTest } from 'utils/tests/test-helper';
import LoginForm from '../login-form';

describe('LoginForm', () => {
  test('should render in the document with correct styles', () => {
    snapShotTest(<LoginForm />);
  });
});

// TODO need to figure out how to test firebase.auth() without calling real firebase API
