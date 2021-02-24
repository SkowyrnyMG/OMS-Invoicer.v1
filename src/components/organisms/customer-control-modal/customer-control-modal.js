import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';
import HelpToolTip from 'components/modules/help-tool-tip/help-tool-tip';
import ViesSearch from 'components/modules/vies-search/vies-search';

import { useValidationSchema } from 'hooks/useValidationSchema';
import {
  getAllCustomers,
  addNewCustomer,
  selectCustomers,
} from 'store/slices/db-slice/db-slice';

const Wrapper = styled.div`
  position: relative;
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
  position: relative;
  overflow: auto;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

  ${({ theme: { mq } }) => mq.desktop} {
    grid-template-columns: 1fr;
  }

  ${({ theme: { mq } }) => mq.smallTablet} {
    padding: 5rem 0;

    > * {
      padding: 0 1rem !important;
      flex-basis: 100%;
    }
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

const AddNewCustomerModal = ({ closeModal, currentCustomer }) => {
  const dispatch = useDispatch();
  const allCustomers = useSelector(selectCustomers);
  const [initValues, setInitValues] = useState({
    name: '',
    vat_number: '',
    country: '',
    town: '',
    street: '',
    postCode: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    tax: '',
  });
  const validationSchema = useValidationSchema('customers');
  const [verifyCuntryCode, setVerifyCountryCode] = useState('PL');
  const [verifyInput, setVerifyInput] = useState('');
  const [isViesValid, setIsViesValid] = useState(true);
  const [isVatDoubledMsg, setIsVatDoubledMsg] = useState(false);

  useEffect(() => {
    // * creating AbortController variable is work around Eslind undef bug
    const { AbortController } = window;
    const ac = new AbortController();
    if (currentCustomer) {
      setInitValues(currentCustomer);
    }
    return () => ac.abort();
  }, [currentCustomer]);

  const ToolTipInfo = `This modal is responsible for adding new customers to the database. If your customer has active VAT ID you can add it's base company details using "Search in Vies" field. To do that you just have to simply provide correct country prefix in option field and your customer VAT ID number. If customer will be found in Vies database most of modal fiels should be autofilled.`;

  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer>
          <HelpToolTip info={ToolTipInfo} />
          <Formik
            enableReinitialize
            initialValues={{
              name: initValues.name,
              vat_number: initValues.vat_number,
              country: initValues.country,
              town: initValues.town,
              street: initValues.street,
              postCode: initValues.postCode,
              contactPerson: '',
              contactEmail: '',
              contactPhone: '',
              tax: initValues.tax,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const parsedValues = {
                ...values,
                address: `${values.street}, ${values.postCode}, ${values.town}, ${values.country},`,
              };
              const isNewCustomer = currentCustomer === null ? true : false;
              const isVatDoubled =
                allCustomers !== null && allCustomers !== false && isNewCustomer
                  ? allCustomers.filter(
                      (customer) => customer.vat_number === values.vat_number,
                    )
                  : [];

              // * app prevents to add a customer more than once
              if (isVatDoubled.length === 0) {
                setIsVatDoubledMsg(false);
                await dispatch(addNewCustomer(parsedValues));
                closeModal();
              } else {
                setIsVatDoubledMsg(true);
              }
              if (isVatDoubled.length === 0 && !isNewCustomer) {
                await dispatch(getAllCustomers());
              }
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <div>
                  <ViesSearch
                    setValidation={setIsViesValid}
                    isValid={isViesValid}
                    setInitialsFn={setInitValues}
                    setQueryVat={setVerifyInput}
                    queryVat={verifyInput}
                    setQueryCountryCode={setVerifyCountryCode}
                    queryCountryCode={verifyCuntryCode}
                  />
                  <StyledHeading>Base company details</StyledHeading>
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
                  <StyledHeading>Default invoicing details</StyledHeading>
                  <FormikControl
                    type='number'
                    control='input'
                    name='tax'
                    error={errors.tax}
                    touched={touched.tax}
                    placeholder='TAX'
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

AddNewCustomerModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddNewCustomerModal;
