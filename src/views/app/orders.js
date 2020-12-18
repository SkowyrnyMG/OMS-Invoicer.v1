import React, { useEffect } from 'react';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'utils/layout';
import OrdersModule from 'components/organisms/orders-module/orders-module';

import { getAllOrders, selectOrders } from 'store/slices/db-slice/db-slice';

const Orders = () => {
  const dispatch = useDispatch();
  const ordersList = useSelector(selectOrders);

  useEffect(() => dispatch(getAllOrders()), [dispatch]);
  return (
    <Layout>
      <OrdersModule ordersList={ordersList} />
    </Layout>
  );
};

export default Orders;
