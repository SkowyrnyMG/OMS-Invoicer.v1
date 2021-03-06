import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
// import axios from 'axios';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import WarningPopup from 'components/modules/warning-popup/warning-popup';
import FormikControl from 'components/modules/formik-control/formik-control';
import ComboboxOrderMenu from 'components/modules/combobox-order-menu/combobox-order-menu';
import ActionMenu from 'components/modules/action-menu/action-menu';
import NavLink from 'components/atoms/nav-link/nav-link';
import Button from 'components/atoms/button/button';
import HelpToolTip from 'components/modules/help-tool-tip/help-tool-tip';

import { routes } from 'utils/routes';
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
  position: relative;
  overflow: ${({ isWarningOpen }) =>
    isWarningOpen ? 'hidden' : 'hidden auto'} !important;
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
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [initValues, setInitValues] = useState({
    price: '',
    currency: 'EUR',
    status: 'in progress',
    email: '',
    finish_date: '',
    desc: '',
    customer_name: '',
    customer_vat: '',
    customer_address: '',
    tax: '',
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
    setIsWarningOpen(
      customers.length === 0 ||
        (customers.length === undefined && !currentOrder),
    );
  }, [
    dispatch,
    customers.length,
    currentOrder,
    setInitValues,
    setIsWarningOpen,
    customers,
  ]);

  const handleSetItemFn = (item) => {
    if (item === null) {
      return;
    }
    setInitValues((state) => ({
      ...state,
      customer_name: item.name,
      customer_vat: item.vat_number,
      customer_address: item.address,
      tax: item.tax,
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

  const ToolTipInfo = `In this modal you can add new or edit already existing order. To create new order you have to choose customer from your database using "Choose a Customer" field. Then you can add details of new order. To edit already existing order just make your changes and click on save button. If the order is finished you need to change it's status to "finished", otherwise you will not be able to issue an invoice.`;

  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer isWarningOpen={isWarningOpen}>
          <HelpToolTip info={ToolTipInfo} />
          <WarningPopup
            title='Any Customer found'
            isWarningOpen={isWarningOpen}
          >
            To create new order you have to add some Customers first!! Please go
            back to
            <NavLink path={routes.appCustomers}> customers tab </NavLink>
            and add new Customer!
          </WarningPopup>
          <Formik
            disabled
            enableReinitialize
            initialValues={{
              price: initValues.price,
              currency: initValues.currency,
              status: initValues.status,
              email: initValues.email,
              finish_date:
                initValues.finish_date !== ''
                  ? format(new Date(initValues.finish_date), 'yyyy-MM-dd')
                  : initValues.finish_date,
              desc: initValues.desc,
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
                email: values.email,
                status: values.status,
                finish_date: values.finish_date,
                desc: values.desc,
                customer_name: values.customer_name,
                customer_vat: values.customer_vat,
                customer_address: values.customer_address,
                tax: initValues.tax,
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
                      items={customers.length ? customers : []}
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
                    control='date'
                    name='finish_date'
                    error={errors.finish_date}
                    touched={touched.finish_date}
                    placeholder='Estimated Completion Date'
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

OrderControlModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default OrderControlModal;
