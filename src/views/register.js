import React from 'react';

import Layout from 'utils/layout';
import AuthFormWrapper from 'components/modules/auth-form-wrapper/auth-form-wrapper';
import RegisterForm from 'components/organisms/register-form/register-form';

const Register = () => (
  <Layout>
    <AuthFormWrapper>
      <RegisterForm />
    </AuthFormWrapper>
  </Layout>
);

export default Register;
