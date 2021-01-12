import React, { useEffect } from 'react';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import InvoicesModule from 'components/organisms/invoices-module/invoices-module';
import Layout from 'utils/layout';

import { getAllInvoices, selectInvoices } from 'store/slices/db-slice/db-slice';

const Invoices = () => {
  const dispatch = useDispatch();
  const invoicesList = useSelector(selectInvoices);

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  return (
    <Layout>
      <InvoicesModule invoicesList={invoicesList} />
    </Layout>
  );
};

export default Invoices;
