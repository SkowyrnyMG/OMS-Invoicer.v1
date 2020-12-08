import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';
import Input from 'components/atoms/input/input';

import { useValidationSchema } from 'hooks/useValidationSchema';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme: { color } }) => color.bg};
  z-index: 400;
`;

const StyledAppBodyContainer = styled(AppBodyContainer)`
  overflow: auto;
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  padding: 5rem;

  > div {
    padding: 0 4rem;
    flex-basis: 50%;
  }

  > div:first-child {
    border-right: 1px solid ${({ theme: { color } }) => color.devider};
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
  }
`;

const ViesWrapper = styled.div`
  margin-bottom: 5rem;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  justify-self: flex-end;
`;

const StyledHeading = styled.h4`
  margin-bottom: 2rem;
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
`;

const AddNewCustomerModal = () => {
  const validationSchema = useValidationSchema('customers');
  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer>
          <Formik
            initialValues={{
              nameOfCompany: '',
              vat: '',
              country: '',
              town: '',
              postCode: '',
              contactPerson: '',
              contactEmail: '',
              contactPhone: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <div>
                  <ViesWrapper>
                    <StyledParagraph>
                      Put VAT Number below and search customer details in VIES
                      database
                    </StyledParagraph>
                    <Input placeholder='Search in VIES' />
                  </ViesWrapper>
                  <StyledHeading>Base company details</StyledHeading>
                  <FormikControl
                    type='text'
                    control='input'
                    name='nameOfCompany'
                    error={errors.nameOfCompany}
                    touched={touched.nameOfCompany}
                    placeholder='Name of Company'
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='vat'
                    error={errors.vat}
                    touched={touched.vat}
                    placeholder='VAT'
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='country'
                    error={errors.country}
                    touched={touched.country}
                    placeholder='Country'
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='town'
                    error={errors.town}
                    touched={touched.town}
                    placeholder='Town'
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='postCode'
                    error={errors.postCode}
                    touched={touched.postCode}
                    placeholder='Post-code'
                  />
                </div>
                <div>
                  <StyledHeading>Contact person</StyledHeading>
                  <FormikControl
                    type='text'
                    control='input'
                    name='contactPerson'
                    error={errors.contactPerson}
                    touched={touched.contactPerson}
                    placeholder='Contact person name'
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='contactEmail'
                    error={errors.contactEmail}
                    touched={touched.contactEmail}
                    placeholder='email'
                  />
                  <FormikControl
                    type='phone'
                    control='input'
                    name='contactPhone'
                    error={errors.contactPhone}
                    touched={touched.contactPhone}
                    placeholder='Phone'
                  />
                  <StyledButton type='submit'>Save</StyledButton>
                </div>
              </StyledForm>
            )}
          </Formik>
        </StyledAppBodyContainer>
        <ActionMenu>
          <Button>Exit without save</Button>
        </ActionMenu>
      </AppGridContainer>
    </Wrapper>
  );
};

export default AddNewCustomerModal;
