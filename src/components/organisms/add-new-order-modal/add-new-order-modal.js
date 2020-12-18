import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { useValidationSchema } from 'hooks/useValidationSchema';
// import {
//   addNewCustomer,
//   selectCustomers,
// } from 'store/slices/db-slice/db-slice';
// import {
//   setLoadingOn,
//   setLoadingOff,
// } from 'store/slices/loading-slice/loading-slice';

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

const StyledButton = styled(Button)`
  align-self: flex-end;
  justify-self: flex-end;
  margin-bottom: 3rem;
`;

const StyledHeading = styled.h4`
  margin-bottom: 2rem;
`;

const StyledParagraph = styled.p`
  grid-column: -1 / 1;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  color: ${({ theme: { color }, isNoError }) => !isNoError && color.error};
`;

const AddNewCustomerModal = ({ closeModal }) => {
  // const dispatch = useDispatch();
  // const [initValues, setInitValues] = useState({
  //   name: '',

  // });
  const validationSchema = useValidationSchema('customers');
  const [isVatDoubledMsg] = useState(false);

  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer>
          <Formik
            enableReinitialize
            initialValues={{
              order_number: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <div>
                  <StyledHeading>Order details</StyledHeading>
                  <FormikControl
                    type='text'
                    control='input'
                    name='name'
                    error={errors.name}
                    touched={touched.name}
                    placeholder='Name of Company'
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='vat_number'
                    error={errors.vat_number}
                    touched={touched.vat_number}
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
                    name='street'
                    error={errors.street}
                    touched={touched.street}
                    placeholder='Street'
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
                  {isVatDoubledMsg !== false && (
                    <StyledParagraph isNoError={!isVatDoubledMsg}>
                      This customer is already present in your client list
                      database!
                    </StyledParagraph>
                  )}
                </div>
              </StyledForm>
            )}
          </Formik>
        </StyledAppBodyContainer>
        <ActionMenu>
          <Button onClick={closeModal}>Exit without save</Button>
        </ActionMenu>
      </AppGridContainer>
    </Wrapper>
  );
};

export default AddNewCustomerModal;
