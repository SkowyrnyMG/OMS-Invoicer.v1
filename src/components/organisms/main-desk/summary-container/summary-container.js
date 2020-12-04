import React from 'react';
import styled from 'styled-components';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import SummaryCounter from 'components/modules/summary-counter/summary-counter';
import SummaryPosition from 'components/modules/summary-position/summary-position';

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

const SummaryContainer = () => (
  <AppBodyContainer>
    <CountersBox>
      <SummaryCounter title='PENDING ORDERS' counter={15} />
      <SummaryCounter title='ORDERS WITHOUT INVOICE' counter={3} />
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

export default SummaryContainer;
