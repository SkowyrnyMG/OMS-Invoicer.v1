import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import FormikControl from 'components/modules/formik-control/formik-control';
import HeadingBlue from 'components/atoms/heading-blue/heading-blue';
import Button from 'components/atoms/button/button';

import { useValidationSchema } from 'hooks/useValidationSchema';

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
`;

const ConfigWrapper = styled.div`
  padding: 5rem;
`;

const ConfigOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: end;
  align-content: top;
  justify-items: left;
  padding: 2rem;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  label {
    margin-bottom: 0 !important;
  }
`;

const StyledFormikControl = styled(FormikControl)`
  width: 7rem !important;
  margin: 0 !important;
`;

const StyledButton = styled(Button)`
  margin-top: 3rem;
`;

const ConfigForm = ({ onSubmit }) => {
  const validationSchema = useValidationSchema('config');
  return (
    <Formik
      initialValues={{ mainInvoicePrefix: '', mainOrderPrefix: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <ConfigWrapper>
            <HeadingBlue>Registry options</HeadingBlue>
            <ConfigOption htmlFor='mainInvoicePrefix'>
              <p>Invoice prefix</p>
              <StyledFormikControl
                type='text'
                control='input'
                name='mainInvoicePrefix'
                error={errors.mainInvoicePrefix}
                touched={touched.mainInvoicePrefix}
              />
            </ConfigOption>
            <ConfigOption htmlFor='mainOrderPrefix'>
              <p>Order prefix</p>
              <StyledFormikControl
                type='text'
                control='input'
                name='mainOrderPrefix'
                error={errors.mainOrderPrefix}
                touched={touched.mainOrderPrefix}
              />
            </ConfigOption>
            <StyledButton type='submit'>Save</StyledButton>
          </ConfigWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default ConfigForm;
