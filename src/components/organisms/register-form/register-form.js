import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import FormikControl from 'components/modules/formik-control/formik-control';
import Button from 'components/atoms/button/button';

import { useValidationSchema } from 'hooks/useValidationSchema';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45rem;
`;

const RegisterForm = () => {
  const validationSchema = useValidationSchema('register');

  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
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
          <Button type='submit'>Submit</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RegisterForm;
