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
import { ReactComponent as SearchIcon } from 'assets/svg/search-icon.svg';
import Input from 'components/atoms/input/input';

import { useValidationSchema } from 'hooks/useValidationSchema';
import {
  addNewCustomer,
  selectCustomers,
} from 'store/slices/db-slice/db-slice';
import {
  setLoadingOn,
  setLoadingOff,
} from 'store/slices/loading-slice/loading-slice';

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

const ViesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  align-items: center;
  margin-bottom: 5rem;
`;
const StyledParagraph = styled.p`
  grid-column: -1 / 1;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  color: ${({ theme: { color }, isNoError }) => !isNoError && color.error};
`;

const StyledViesButton = styled(Button)`
  grid-column: 3 / 4;
  width: fit-content;
  height: fit-content;

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme: { color } }) => color.bg};
  }
`;

const StyledInput = styled(Input)`
  grid-column: 1 / 3;
`;

const AddNewCustomerModal = ({ closeModal }) => {
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
  });
  const validationSchema = useValidationSchema('customers');
  const [verifyInput, setVerifyInput] = useState('');
  const [isViesValid, setIsViesValid] = useState(true);
  const [isVatDoubledMsg, setIsVatDoubledMsg] = useState(false);

  const handleViesClick = async () => {
    dispatch(setLoadingOn());
    const result = await axios.get(`/api/verify?vat=${verifyInput}`);
    const {
      data: { data },
    } = result;

    dispatch(setLoadingOff());
    if (!data) {
      setIsViesValid(false);
      return;
    }

    if (data.valid) {
      setIsViesValid(true);

      const splittedAddres = data.address.split(',');
      const streetVies = splittedAddres[0];
      const postCodeVies = splittedAddres[1].split(' ')[1].replace('-', '');
      const townVies = splittedAddres[1].split(' ')[2];

      setInitValues((state) => ({
        ...state,
        name: data.name,
        vat_number: data.countryCode + data.vatNumber,
        country: data.countryCode,
        town: townVies,
        street: streetVies,
        postCode: data.countryCode + postCodeVies,
      }));
    }

    if (!data.valid) {
      setIsViesValid(false);
    }
  };

  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer>
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
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const isVatDoubled =
                allCustomers !== null && allCustomers !== false
                  ? allCustomers.filter(
                      (customer) => customer.vat_number === values.vat_number
                    )
                  : [];

              if (isVatDoubled.length === 0) {
                setIsVatDoubledMsg(false);
                const parsedValues = {
                  ...values,
                  address: `${values.street}, ${values.postCode}, ${values.town}, ${values.country},`,
                };
                dispatch(addNewCustomer(parsedValues));
                closeModal();
              } else {
                setIsVatDoubledMsg(true);
              }
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <div>
                  <ViesWrapper>
                    <StyledParagraph isNoError>
                      Put VAT Number below and search customer details in VIES
                      database
                    </StyledParagraph>
                    <StyledInput
                      placeholder='Search  in VIES'
                      value={verifyInput}
                      onChange={(e) => setVerifyInput(e.target.value)}
                    />
                    <StyledViesButton
                      type='button'
                      onClick={() => handleViesClick('verify')}
                    >
                      <SearchIcon />
                    </StyledViesButton>
                    {!isViesValid && (
                      <StyledParagraph isNoError={isViesValid}>
                        Your customer&apos;s VAT number is not valid/active!
                      </StyledParagraph>
                    )}
                  </ViesWrapper>
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
