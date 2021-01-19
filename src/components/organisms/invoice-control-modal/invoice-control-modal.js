import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import ComboboxInvoiceMenu from 'components/modules/combobox-invoice-menu/combobox-invoice-menu';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { STATUS_OPTION, CURRENCY } from 'utils/constant-data';
import { useValidationSchema } from 'hooks/useValidationSchema';
import { useAutoNumeration } from 'hooks/useAutoNumeration';
import {
  addNewInvoice,
  getAllOrders,
  getAllInvoices,
  // getAllCustomers,
  setOrderStatus,
  selectOrders,
} from 'store/slices/db-slice/db-slice';

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
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  justify-self: flex-end;
  margin-bottom: 3rem;
`;

const StyledHeading = styled.h4`
  margin-bottom: 2rem;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledSpan = styled.span``;

// const OrderDetailsWrapper = styled.div`
//   opacity: ${({ initValues }) => (initValues.customer_vat !== '' ? 1 : 0.5)};
//   pointer-events: ${({ initValues }) =>
//     initValues.customer_vat !== '' ? 'auto' : 'none'};
//   cursor: ${({ initValues }) =>
//     initValues.customer_vat !== '' ? 'arrow' : 'not-allowed'};
// `;

const InvoiceControlModal = ({ closeModal, currentInvoice }) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [initValues, setInitValues] = useState({
    order_number: '',
    price: '',
    currency: '',
    payment_status: 'unpaid',
    payment_value: 0,
    left_to_pay: 0,
    desc: '',
    customer_name: '',
    customer_vat: '',
    customer_address: '',
  });
  const validationSchema = useValidationSchema('newInvoice');
  const newInvoice = useAutoNumeration();

  const handleSetItemFn = (item) => {
    if (item === null) {
      return;
    }
    setInitValues((state) => ({
      ...state,
      ...item,
      left_to_pay: item.price,
    }));
  };

  const handleResetItemFn = () => {
    setInitValues((state) => ({
      ...state,
      order_number: '',
      price: '',
      currency: '',
      payment_status: 'unpaid',
      payment_value: 0,
      left_to_pay: 0,
      desc: '',
      customer_name: '',
      customer_vat: '',
      customer_address: '',
    }));
  };

  const invoiceNumberSetter = () =>
    currentInvoice ? currentInvoice.invoice_number : newInvoice;

  useEffect(() => {
    // * if there is no orders in app store then get it from the database
    if (!orders.length) {
      dispatch(getAllOrders());
    }
    if (currentInvoice) {
      setInitValues(currentInvoice);
    }
  }, [dispatch, orders.length, currentInvoice, setInitValues, orders]);

  const finishedOrders = orders.filter(
    (order) => order.status === STATUS_OPTION.order.finished
  );

  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer>
          <Formik
            enableReinitialize
            initialValues={{
              order_number: initValues.order_number,
              price: initValues.price,
              currency: initValues.currency,
              payment_status: initValues.payment_status,
              payment_value: initValues.payment_value,
              left_to_pay: initValues.left_to_pay,
              desc: initValues.desc,
              customer_name: initValues.customer_name,
              customer_vat: initValues.customer_vat,
              customer_address: initValues.customer_address,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const invoiceValues = await {
                invoice_number: invoiceNumberSetter(),
                order_number: values.order_number,
                price: values.price,
                currency: values.currency,
                desc: values.desc,
                payment_status: values.payment_status,
                payment_value: values.payment_value,
                left_to_pay:
                  values.payment_status === 'paid'
                    ? 0
                    : values.price - values.payment_value,
                customer_name: values.customer_name,
                customer_vat: values.customer_vat,
                customer_address: values.customer_address,
              };

              const isNewInvoice = currentInvoice ? false : true;

              const submitData = {
                invoiceValues,
                isNewInvoice,
              };

              const status = `Invoice issued: ${invoiceNumberSetter()}`;
              await dispatch(addNewInvoice(submitData));
              await dispatch(
                setOrderStatus({ orderNumber: values.order_number, status })
              );
              if (!isNewInvoice) {
                await dispatch(getAllInvoices());
              }
              if (isNewInvoice) {
                await dispatch(getAllOrders());
              }

              closeModal();
            }}
          >
            {({ errors, touched, values }) => (
              <StyledForm>
                {!currentInvoice && (
                  <ComboboxInvoiceMenu
                    items={finishedOrders}
                    handleSetItemFn={handleSetItemFn}
                    handleResetItemFn={handleResetItemFn}
                  />
                )}
                <div>
                  <StyledHeading>Customer info</StyledHeading>
                  <FormikControl
                    type='text'
                    control='input'
                    name='customer_name'
                    error={errors.customer_name}
                    touched={touched.customer_name}
                    placeholder='CUSTOMER NAME'
                    disabled
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='customer_vat'
                    error={errors.customer_vat}
                    touched={touched.customer_vat}
                    placeholder='CUSTOMER VAT'
                    disabled
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='customer_address'
                    error={errors.customer_address}
                    touched={touched.customer_address}
                    placeholder='CUSTOMER ADDRESS'
                    disabled
                  />
                </div>
                <div>
                  <StyledHeading>Invoice details</StyledHeading>
                  <StyledHeading>
                    <span>Invoice Number: </span>
                    {invoiceNumberSetter()}
                  </StyledHeading>
                  <FormikControl
                    type='text'
                    control='input'
                    name='order_number'
                    error={errors.order_number}
                    touched={touched.order_number}
                    placeholder='ORDER NUMBER'
                    disabled
                  />
                  <FormikControl
                    type='number'
                    control='input'
                    name='price'
                    error={errors.price}
                    touched={touched.price}
                    placeholder='PRICE'
                  />
                  <FormikControl
                    type='number'
                    control='input'
                    name='left_to_pay'
                    error={errors.left_to_pay}
                    touched={touched.left_to_pay}
                    placeholder='LEFT TO PAY'
                    disabled
                  />
                  {/* <FormikControl
                    type='text'
                    control='input'
                    name='currency'
                    error={errors.currency}
                    touched={touched.currency}
                    placeholder='CURRENCY'
                  /> */}
                  <FormikControl
                    type='input'
                    control='select'
                    name='currency'
                    error={errors.currency}
                    touched={touched.currency}
                    placeholder='CURRENCY'
                    value={
                      currentInvoice ? currentInvoice.currency : values.currency
                    }
                    options={CURRENCY}
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='desc'
                    error={errors.desc}
                    touched={touched.desc}
                    placeholder='DESCRIPTION'
                  />
                  <RadioGroup>
                    <StyledSpan>STATUS:</StyledSpan>
                    <FormikControl
                      type='radio'
                      control='radio'
                      name='payment_status'
                      value='unpaid'
                      displayError
                    />
                    <FormikControl
                      type='radio'
                      control='radio'
                      name='payment_status'
                      value='paid'
                    />
                    <FormikControl
                      type='radio'
                      control='radio'
                      name='payment_status'
                      value='partialy paid'
                    />
                  </RadioGroup>
                  {values.payment_status === 'partialy paid' && (
                    <FormikControl
                      type='number'
                      control='input'
                      name='payment_value'
                      error={errors.payment_value}
                      touched={touched.payment_value}
                      placeholder='PAYMENT VALUE'
                    />
                  )}
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

export default InvoiceControlModal;
