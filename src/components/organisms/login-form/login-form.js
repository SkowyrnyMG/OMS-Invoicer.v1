import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import FormikControl from 'components/modules/formik-control/formik-control';
import Button from 'components/atoms/button/button';
import NotificationPopup from 'components/modules/notification-popup/notification-popup';

import { useValidationSchema } from 'hooks/useValidationSchema';
import {
  signInWithEmailAndPassword,
  getUserStatus,
} from 'store/slices/auth-slice/auth-slice';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45rem;

  ${({ theme: { mq } }) => mq.smallTablet} {
    width: 100%;
    margin: 0 2rem;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector(getUserStatus);

  const validationSchema = useValidationSchema('login');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await dispatch(signInWithEmailAndPassword(values));
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

          <NotificationPopup successRegexp='success'>
            {userStatus}
          </NotificationPopup>

          <Button type='submit'>Submit</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
