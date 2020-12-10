import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import styled from 'styled-components';

import {
  selectCustomers,
  getAllCustomers,
} from 'store/slices/db-slice/db-slice';

import CustomersModule from 'components/organisms/customers-module/customers-module';
import AddNewCustomerModal from 'components/organisms/add-new-customer-modal/add-new-customer-modal';

import Layout from 'utils/layout';

const Customers = () => {
  const dispatch = useDispatch();
  const customersList = useSelector(selectCustomers);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  return (
    <Layout>
      {isModalOpen ?? (
        <AddNewCustomerModal closeModal={() => setIsModalOpen(false)} />
      )}
      <CustomersModule
        customersList={customersList}
        openModal={() => setIsModalOpen(true)}
      />
    </Layout>
  );
};

export default Customers;
