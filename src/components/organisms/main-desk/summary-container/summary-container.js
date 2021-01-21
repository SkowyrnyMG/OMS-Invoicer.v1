import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import SummaryCounter from 'components/modules/summary-counter/summary-counter';
import SummaryPosition from 'components/modules/summary-position/summary-position';

import { useOrdersByStatus } from 'hooks/useOrdersByStatus';
import { STATUS_OPTION } from 'utils/constant-data';
import { getAllOrders, selectOrders } from 'store/slices/db-slice/db-slice';

const CountersBox = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  > *:not(:first-of-type) {
    border-left: 1px solid ${({ theme: { color } }) => color.devider};
  }
`;

const SummaryWrapper = styled.div`
  padding: 3rem 4.5rem;
`;

const StyledHeading = styled.h3`
  margin-bottom: 2rem;
`;

const SummaryContainer = () => {
  const allOrders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const finishedOrders = useOrdersByStatus(STATUS_OPTION.order.finished);
  const pendingOrders = useOrdersByStatus(STATUS_OPTION.order.pending);

  useEffect(() => {
    if (allOrders.length === 0) {
      dispatch(getAllOrders());
    }
  }, [allOrders, dispatch]);

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
        <SummaryCounter title='DELAYED PAYMENTS' counter={13} />
      </CountersBox>
      <SummaryWrapper>
        <StyledHeading>Summary</StyledHeading>
        <SummaryPosition posName='Orders in November:' />
        <SummaryPosition posName='Orders in November:' />
        <SummaryPosition posName='Orders in November:' />
      </SummaryWrapper>
    </AppBodyContainer>
  );
};

export default SummaryContainer;
