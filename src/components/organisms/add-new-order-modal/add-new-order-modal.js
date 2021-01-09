import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import FormikControl from 'components/modules/formik-control/formik-control';
import ComboboxMenu from 'components/modules/combobox-menu/combobox-menu';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { useValidationSchema } from 'hooks/useValidationSchema';
import { useNextOrder } from 'hooks/useNextOrder';
import {
  addNewOrder,
  getAllCustomers,
  selectCustomers,
} from 'store/slices/db-slice/db-slice';
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

// const StyledParagraph = styled.p`
//   grid-column: -1 / 1;
//   font-size: ${({ theme: { fontSize } }) => fontSize.s};
//   color: ${({ theme: { color }, isNoError }) => !isNoError && color.error};
// `;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledSpan = styled.span``;

const OrderDetailsWrapper = styled.div`
  opacity: ${({ initValues }) => (initValues.customerVat !== '' ? 1 : 0.5)};
  pointer-events: ${({ initValues }) =>
    initValues.customerVat !== '' ? 'auto' : 'none'};
  cursor: ${({ initValues }) =>
    initValues.customerVat !== '' ? 'arrow' : 'not-allowed'};
`;

const AddNewCustomerModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const [initValues, setInitValues] = useState({
    customerName: '',
    customerVat: '',
    customerAddress: '',
  });
  const validationSchema = useValidationSchema('newOrder');
  const newOrder = useNextOrder();
  // const [initValues, setInitValues] = useState({
  //   name: '',

  // });

  console.log(customers);

  useEffect(() => {
    if (!customers.length) {
      dispatch(getAllCustomers());
    }
  }, [dispatch, customers.length]);

  const handleSetItemFn = (item) => {
    if (item === null) {
      return;
    }
    setInitValues((state) => ({
      ...state,
      customerName: item.name,
      customerVat: item.vat_number,
      customerAddress: item.address,
    }));
  };
  return (
    <Wrapper>
      <AppGridContainer>
        <StyledAppBodyContainer>
          <Formik
            enableReinitialize
            initialValues={{
              price: '',
              currency: '',
              status: 'in progress',
              desc: '',
              email: '',
              customerName: initValues.customerName,
              customerVat: initValues.customerVat,
              customerAddress: initValues.customerAddress,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const orderValues = await {
                order_number: newOrder,
                price: values.price,
                currency: values.currency,
                desc: values.desc,
                email: values.email,
                status: values.status,
                customer_name: values.customerName,
                customer_vat: values.customerVat,
                customer_address: values.customerAddress,
              };
              console.log(orderValues);
              dispatch(addNewOrder(orderValues));
              closeModal();
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <div>
                  <StyledHeading>Customer info</StyledHeading>
                  <ComboboxMenu
                    items={customers}
                    handleSetItemFn={handleSetItemFn}
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='customerName'
                    error={errors.customerName}
                    touched={touched.customerName}
                    placeholder='CUSTOMER NAME'
                    disabled
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='customerVat'
                    error={errors.customerVat}
                    touched={touched.customerVat}
                    placeholder='CUSTOMER VAT'
                    disabled
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='customerAddress'
                    error={errors.customerAddress}
                    touched={touched.customerAddress}
                    placeholder='CUSTOMER ADDRESS'
                    disabled
                  />
                </div>
                <OrderDetailsWrapper initValues={initValues}>
                  <StyledHeading>Order details</StyledHeading>
                  <StyledHeading>
                    <span>Order Number: </span>
                    {newOrder}
                  </StyledHeading>
                  <FormikControl
                    type='number'
                    control='input'
                    name='price'
                    error={errors.price}
                    touched={touched.price}
                    placeholder='PRICE'
                  />
                  <FormikControl
                    type='text'
                    control='input'
                    name='currency'
                    error={errors.currency}
                    touched={touched.currency}
                    placeholder='CURRENCY'
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
                      name='status'
                      value='in progress'
                    />
                    <FormikControl
                      type='radio'
                      control='radio'
                      name='status'
                      value='finished'
                    />
                  </RadioGroup>
                </OrderDetailsWrapper>

                <StyledButton type='submit'>Save</StyledButton>
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
