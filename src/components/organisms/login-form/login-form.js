import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import FormikControl from 'components/modules/formik-control/formik-control';
import Button from 'components/atoms/button/button';

import { useValidationSchema } from 'hooks/useValidationSchema';
import { getSignInUserStatus, selectStatus } from 'store/slices/auth-slice';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45rem;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector(selectStatus);
  const validationSchema = useValidationSchema('login');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await dispatch(getSignInUserStatus(values));
      }}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <FormikControl
            type='text'
            control='input'
            name='email'
            error={errors.email}
            touched={touched.email}
            placeholder='Your email'
          />
          <FormikControl
            type='password'
            control='input'
            name='password'
            error={errors.password}
            touched={touched.password}
            placeholder='Your password'
          />
          <p>{userStatus}</p>
          <Button type='submit'>Submit</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
