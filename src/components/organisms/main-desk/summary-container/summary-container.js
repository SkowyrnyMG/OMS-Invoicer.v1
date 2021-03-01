import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import SummaryCounter from 'components/modules/summary-counter/summary-counter';
import TotalItemCounter from 'components/modules/total-item-counter/total-item-counter';
import { ReactComponent as CustomersIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as InvoicesIcon } from 'assets/svg/invoice-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';

import { routes } from 'utils/routes';
import { useOrdersByStatus } from 'hooks/useOrdersByStatus';
import { useInvoicesByStatus } from 'hooks/useInvoicesByStatus';
import { STATUS_OPTION } from 'utils/constant-data';
import {
  getAllOrders,
  getAllInvoices,
  getAllCustomers,
} from 'store/slices/db-slice/db-slice';
import { useCollectionsLength } from 'hooks/useCollectionsLength';

const CountersBox = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  /* > *:not(:first-of-type) {
    border-left: 1px solid ${({ theme: { color } }) => color.devider};
  } */

  ${({ theme: { mq } }) => mq.mediumTablet} {
    flex-wrap: wrap;
  }
`;

const SummaryWrapper = styled.div`
  height: 70%;
  width: 100%;

  padding: 1rem 4.5rem;
`;

const TotalItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  ${({ theme: { mq } }) => mq.mediumTablet} {
    /* flex-wrap: wrap; */
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    height: fit-content;
  }
`;

const StyledHeading = styled.h3`
  margin: 2rem 0 -4rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall};
  color: ${({ theme: { color } }) => color.primary};

  ${({ theme: { mq } }) => mq.mediumTablet} {
    text-align: center;
  }
`;

const SummaryContainer = () => {
  const collectionsLength = useCollectionsLength();
  const dispatch = useDispatch();
  const finishedOrders = useOrdersByStatus(STATUS_OPTION.order.finished);
  const pendingOrders = useOrdersByStatus(STATUS_OPTION.order.pending);
  const unpaidInvoices = useInvoicesByStatus(STATUS_OPTION.invoice.unpaid);
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllInvoices());
    dispatch(getAllCustomers());
  }, [dispatch]);

  return (
    <AppBodyContainer>
      <CountersBox>
        <SummaryCounter
          title='ORDERS IN PROGRESS'
          counter={pendingOrders.counter}
        />
        <SummaryCounter
          title='FINISHED ORDERS WITHOUT INVOICE'
          counter={finishedOrders.counter}
        />
        <SummaryCounter
          title='UNPAID INVOICES'
          counter={unpaidInvoices.counter}
        />
      </CountersBox>
      <SummaryWrapper>
        <StyledHeading>SUMMARY</StyledHeading>
        <TotalItemsWrapper>
          <TotalItemCounter
            bgColor={({ theme: { color } }) => color.primary}
            title='Total customers'
            path={routes.appCustomers}
            counter={collectionsLength.customers}
            linkInfo='View more customers..'
          >
            <CustomersIcon />
          </TotalItemCounter>
          <TotalItemCounter
            bgColor={({ theme: { color } }) => color.secondary}
            title='Total orders'
            path={routes.appOrders}
            counter={collectionsLength.orders}
            linkInfo='View more orders..'
          >
            <OrdersIcon />
          </TotalItemCounter>
          <TotalItemCounter
            bgColor={({ theme: { color } }) => color.tertiary}
            title='Total invoices'
            path={routes.appInvoices}
            counter={collectionsLength.invoices}
            linkInfo='View more invoices..'
          >
            <InvoicesIcon />
          </TotalItemCounter>
        </TotalItemsWrapper>
      </SummaryWrapper>
    </AppBodyContainer>
  );
};

export default SummaryContainer;
