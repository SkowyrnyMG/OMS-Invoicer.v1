import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';
import { ReactComponent as SearchIcon } from 'assets/svg/search-icon.svg';
import Input from 'components/atoms/input/input';

import { useValidationSchema } from 'hooks/useValidationSchema';
import { addNewCustomer } from 'store/slices/db-slice/db-slice';

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

  const handleViesClick = async () => {
    const result = await axios.get(`/api/verify?vat=${verifyInput}`);
    const {
      data: { data },
    } = result;
    console.log(data);

    if (data.valid) {
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
              const parsedValues = {
                ...values,
                address: `${values.street}, ${values.postCode}, ${values.town}, ${values.country},`,
              };
              dispatch(addNewCustomer(parsedValues));
              closeModal();
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
