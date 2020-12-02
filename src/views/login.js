import React from 'react';

import Layout from 'utils/layout';
import AuthFormWrapper from 'components/modules/auth-form-wrapper/auth-form-wrapper';
import LoginForm from 'components/organisms/login-form/login-form';

const Login = () => (
  <Layout>
    <AuthFormWrapper title='Sign in!'>
      <LoginForm />
    </AuthFormWrapper>
  </Layout>
);

export default Login;
