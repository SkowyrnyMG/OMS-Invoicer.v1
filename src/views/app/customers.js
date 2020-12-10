import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import styled from 'styled-components';

import {
  selectCustomers,
  getAllCustomers,
} from 'store/slices/db-slice/db-slice';

import CustomersModule from 'components/organisms/customers-module/customers-module';

import Layout from 'utils/layout';

const Customers = () => {
  const dispatch = useDispatch();
  const customersList = useSelector(selectCustomers);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  return (
    <Layout>
      <CustomersModule customersList={customersList} />
    </Layout>
  );
};

export default Customers;
