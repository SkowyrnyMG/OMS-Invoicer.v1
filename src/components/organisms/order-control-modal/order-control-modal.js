import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import ComboboxOrderMenu from 'components/modules/combobox-order-menu/combobox-order-menu';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { CURRENCY } from 'utils/constant-data';
import { useValidationSchema } from 'hooks/useValidationSchema';
import { useAutoNumeration } from 'hooks/useAutoNumeration';
import {
  addNewOrder,
  getAllOrders,
  getAllCustomers,
  selectCustomers,
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
  margin-bottom: 4rem;
`;

const StatusWrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2rem;
  width: 100%;
`;

const StyledSpan = styled.span`
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

const OrderDetailsWrapper = styled.div`
  opacity: ${({ initValues }) => (initValues.customer_vat !== '' ? 1 : 0.5)};
  pointer-events: ${({ initValues }) =>
    initValues.customer_vat !== '' ? 'auto' : 'none'};
  cursor: ${({ initValues }) =>
    initValues.customer_vat !== '' ? 'arrow' : 'not-allowed'};
`;

const OrderControlModal = ({ closeModal, currentOrder }) => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const [initValues, setInitValues] = useState({
    price: '',
    currency: 'EUR',
    status: 'in progress',
    desc: '',
    email: '',
    customer_name: '',
    customer_vat: '',
    customer_address: '',
  });
  const validationSchema = useValidationSchema('newOrder');
  const newOrder = useAutoNumeration('order');
  const isInvoiceIssued = currentOrder
    ? currentOrder.status.match(/invoice issued/i)
      ? true
      : false
    : false;

  useEffect(() => {
    // * if there is no customers in app store then get it from the database
    if (!customers.length) {
      dispatch(getAllCustomers());
    }
    if (currentOrder) {
      setInitValues(currentOrder);
    }
  }, [dispatch, customers.length, currentOrder, setInitValues]);

  const handleSetItemFn = (item) => {
    if (item === null) {
      return;
    }
    setInitValues((state) => ({
      ...state,
      customer_name: item.name,
      customer_vat: item.vat_number,
      customer_address: item.address,
    }));
  };

  const handleResetItemFn = () => {
    setInitValues((state) => ({
      ...state,
      customer_name: '',
      customer_vat: '',
      customer_address: '',
    }));
  };

  const orderNumberSetter = () =>
    currentOrder ? currentOrder.order_number : newOrder;

  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer>
          <Formik
            disabled
            enableReinitialize
            initialValues={{
              price: initValues.price,
              currency: initValues.currency,
              status: initValues.status,
              desc: initValues.desc,
              email: initValues.email,
              customer_name: initValues.customer_name,
              customer_vat: initValues.customer_vat,
              customer_address: initValues.customer_address,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const orderValues = await {
                order_number: orderNumberSetter(),
                price: values.price,
                currency: values.currency,
                desc: values.desc,
                email: values.email,
                status: values.status,
                customer_name: values.customer_name,
                customer_vat: values.customer_vat,
                customer_address: values.customer_address,
              };

              const isNewOrder = currentOrder ? false : true;

              const submitData = {
                orderValues,
                isNewOrder,
              };

              await dispatch(addNewOrder(submitData));

              if (!isNewOrder) {
                await dispatch(getAllOrders());
              }

              closeModal();
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <div>
                  <StyledHeading>Customer info</StyledHeading>
                  {!isInvoiceIssued && (
                    <ComboboxOrderMenu
                      items={customers}
                      handleSetItemFn={handleSetItemFn}
                      handleResetItemFn={handleResetItemFn}
                      isDisabled={isInvoiceIssued}
                    />
                  )}
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
                <OrderDetailsWrapper initValues={initValues}>
                  <StyledHeading>Order details</StyledHeading>
                  <StyledHeading>
                    <span>Order Number: </span>
                    {orderNumberSetter()}
                  </StyledHeading>
                  <FormikControl
                    type='number'
                    control='input'
                    name='price'
                    error={errors.price}
                    touched={touched.price}
                    placeholder='PRICE'
                    disabled={isInvoiceIssued}
                  />
                  <FormikControl
                    type='input'
                    control='select'
                    name='currency'
                    error={errors.currency}
                    touched={touched.currency}
                    placeholder='CURRENCY'
                    defaultValue={currentOrder ? currentOrder.currency : 'EUR'}
                    options={CURRENCY}
                    disabled={isInvoiceIssued}
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='desc'
                    error={errors.desc}
                    touched={touched.desc}
                    placeholder='DESCRIPTION'
                    disabled={isInvoiceIssued}
                  />
                  <StatusWrapper>
                    <StyledSpan>STATUS:</StyledSpan>
                    <RadioGroup>
                      {currentOrder &&
                      currentOrder.status.match(/invoice issued/i) ? (
                        currentOrder.status
                      ) : (
                        <>
                          <FormikControl
                            type='radio'
                            control='radio'
                            name='status'
                            value='in progress'
                            disabled={isInvoiceIssued}
                          />
                          <FormikControl
                            type='radio'
                            control='radio'
                            name='status'
                            value='finished'
                            disabled={isInvoiceIssued}
                          />
                        </>
                      )}
                    </RadioGroup>
                  </StatusWrapper>
                  <StyledButton disabled={isInvoiceIssued} type='submit'>
                    Save
                  </StyledButton>
                </OrderDetailsWrapper>
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

OrderControlModal.defaultProps = {
  currentOrder: {
    price: '',
    currency: '',
    status: 'in progress',
    desc: '',
    email: '',
    customer_name: '',
    customer_vat: '',
    customer_address: '',
  },
};

OrderControlModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  currentOrder: PropTypes.shape({
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    customer_name: PropTypes.string.isRequired,
    customer_vat: PropTypes.string.isRequired,
    customer_address: PropTypes.string.isRequired,
  }),
};

export default OrderControlModal;
