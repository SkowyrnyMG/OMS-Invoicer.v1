import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import HeadingBlue from 'components/atoms/heading-blue/heading-blue';

import { useValidationSchema } from 'hooks/useValidationSchema';

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
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

const SearchModule = () => {
  const validationSchema = useValidationSchema('config');
  return (
    <AppBodyContainer>
      <Formik
        initialValues={{ mainInvoicePrefix: '', mainOrderPrefix: '' }}
        validationSchema={validationSchema}
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
                <p>Orderf prefix</p>
                <StyledFormikControl
                  type='text'
                  control='input'
                  name='mainOrderPrefix'
                  error={errors.mainOrderPrefix}
                  touched={touched.mainOrderPrefix}
                />
              </ConfigOption>
            </ConfigWrapper>
          </StyledForm>
        )}
      </Formik>
    </AppBodyContainer>
  );
};

export default SearchModule;
