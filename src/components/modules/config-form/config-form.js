import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import FormikControl from 'components/modules/formik-control/formik-control';
import HeadingBlue from 'components/atoms/heading-blue/heading-blue';
import Button from 'components/atoms/button/button';

import { useValidationSchema } from 'hooks/useValidationSchema';
import {
  selectUserConfig,
  registrySetup,
} from 'store/slices/db-slice/db-slice';

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;

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

const StyledHeadingBlue = styled(HeadingBlue)`
  margin: 3rem 0;
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
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  label {
    margin-bottom: 0 !important;
  }
`;

const StyledFormikControl = styled(FormikControl)`
  margin: 0 !important;
`;

const StyledButton = styled(Button)`
  margin-top: 3rem;
`;

const ConfigForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const userConfig = useSelector(selectUserConfig);
  const validationSchema = useValidationSchema('config');

  return (
    <Formik
      enableReinitialize
      initialValues={{
        mainInvoicePrefix:
          userConfig !== null ? userConfig.mainInvoicePrefix : '',
        mainOrderPrefix: userConfig !== null ? userConfig.mainOrderPrefix : '',
        rootCompanyName:
          userConfig !== null
            ? userConfig.rootCompanyDetails.rootCompanyName
            : '',
        rootVat:
          userConfig !== null ? userConfig.rootCompanyDetails.rootVat : '',
        rootStreet:
          userConfig !== null ? userConfig.rootCompanyDetails.rootStreet : '',
        rootPostCode:
          userConfig !== null ? userConfig.rootCompanyDetails.rootPostCode : '',
        rootTown:
          userConfig !== null ? userConfig.rootCompanyDetails.rootTown : '',
        rootCountry:
          userConfig !== null ? userConfig.rootCompanyDetails.rootCountry : '',
        bankName: userConfig !== null ? userConfig.bankDetails.bankName : '',
        bankAccountNumber:
          userConfig !== null ? userConfig.bankDetails.bankAccountNumber : '',
        iban: userConfig !== null ? userConfig.bankDetails.iban : '',
        swift: userConfig !== null ? userConfig.bankDetails.swift : '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const {
          mainInvoicePrefix,
          mainOrderPrefix,
          rootCompanyName,
          rootVat,
          rootStreet,
          rootPostCode,
          rootTown,
          rootCountry,
          bankName,
          bankAccountNumber,
          iban,
          swift,
        } = values;

        const submitData = {
          mainInvoicePrefix,
          mainOrderPrefix,
          rootCompanyDetails: {
            rootCompanyName,
            rootVat,
            rootStreet,
            rootPostCode,
            rootTown,
            rootCountry,
          },
          bankDetails: {
            bankName,
            bankAccountNumber,
            iban,
            swift,
          },
        };
        onSubmit(submitData);

        if (userConfig === null) {
          const defaultPrefixes = { mainOrderPrefix, mainInvoicePrefix };
          dispatch(registrySetup(defaultPrefixes));
        }
      }}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <ConfigWrapper>
            <HeadingBlue>Registry options</HeadingBlue>
            <ConfigOption htmlFor='mainInvoicePrefix'>
              <StyledFormikControl
                type='text'
                control='input'
                name='mainInvoicePrefix'
                error={errors.mainInvoicePrefix}
                touched={touched.mainInvoicePrefix}
                disabled={userConfig}
                placeholder='INVOICE PREFIX'
              />
            </ConfigOption>
            <ConfigOption htmlFor='mainOrderPrefix'>
              <StyledFormikControl
                type='text'
                control='input'
                name='mainOrderPrefix'
                error={errors.mainOrderPrefix}
                touched={touched.mainOrderPrefix}
                disabled={userConfig}
                placeholder='ORDER PREFIX'
              />
            </ConfigOption>
            <StyledHeadingBlue>Bank Details</StyledHeadingBlue>
            <FormikControl
              type='text'
              control='input'
              name='bankName'
              error={errors.bankName}
              touched={touched.bankName}
              placeholder='BANK NAME'
            />
            <FormikControl
              type='text'
              control='input'
              name='bankAccountNumber'
              error={errors.bankAccountNumber}
              touched={touched.bankAccountNumber}
              placeholder='BANK ACCOUNT NUMBER'
            />
            <FormikControl
              type='text'
              control='input'
              name='iban'
              error={errors.iban}
              touched={touched.iban}
              placeholder='IBAN'
            />
            <FormikControl
              type='text'
              control='input'
              name='swift'
              error={errors.swift}
              touched={touched.swift}
              placeholder='SWIFT'
            />
          </ConfigWrapper>
          <ConfigWrapper>
            <StyledHeadingBlue>Company info</StyledHeadingBlue>
            <FormikControl
              type='text'
              control='input'
              name='rootCompanyName'
              error={errors.rootCompanyName}
              touched={touched.rootCompanyName}
              placeholder='COMPANY NAME'
            />
            <FormikControl
              type='text'
              control='input'
              name='rootVat'
              error={errors.rootVat}
              touched={touched.rootVat}
              placeholder='VAT NUMBER'
            />
            <FormikControl
              type='text'
              control='input'
              name='rootStreet'
              error={errors.rootStreet}
              touched={touched.rootStreet}
              placeholder='STREET'
            />
            <FormikControl
              type='text'
              control='input'
              name='rootPostCode'
              error={errors.rootPostCode}
              touched={touched.rootPostCode}
              placeholder='POST CODE'
            />
            <FormikControl
              type='text'
              control='input'
              name='rootTown'
              error={errors.rootTown}
              touched={touched.rootTown}
              placeholder='TOWN'
            />
            <FormikControl
              type='text'
              control='input'
              name='rootCountry'
              error={errors.rootCountry}
              touched={touched.rootCountry}
              placeholder='COUNTRY'
            />
            <StyledButton type='submit'>Save</StyledButton>
          </ConfigWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

ConfigForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ConfigForm;
