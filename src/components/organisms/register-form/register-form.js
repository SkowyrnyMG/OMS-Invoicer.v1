import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import FormikControl from 'components/modules/formik-control/formik-control';
import Button from 'components/atoms/button/button';
import NotificationPopup from 'components/modules/notification-popup/notification-popup';

import { useValidationSchema } from 'hooks/useValidationSchema';
import {
  registerWithEmailAndPassword,
  getUserStatus,
} from 'store/slices/auth-slice/auth-slice';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45rem;
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector(getUserStatus);
  const validationSchema = useValidationSchema('register');

  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(registerWithEmailAndPassword(values));
      }}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <FormikControl
            type='text'
            control='input'
            name='name'
            error={errors.name}
            touched={touched.name}
            placeholder='Your name'
          />
          <FormikControl
            type='text'
            control='input'
            name='lastname'
            error={errors.lastname}
            touched={touched.lastname}
            placeholder='Your lastname'
          />
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
          <FormikControl
            type='password'
            control='input'
            name='passwordConfirmation'
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            placeholder='Repeat password'
          />

          <NotificationPopup successRegexp='Succesfuly registered!'>
            {userStatus}
          </NotificationPopup>

          <Button type='submit'>Submit</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RegisterForm;
