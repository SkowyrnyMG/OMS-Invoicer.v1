import React from 'react';
import styled from 'styled-components';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import HeadingBlue from 'components/atoms/heading-blue/heading-blue';

const CountersBox = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  > *:not(:first-of-type) {
    border-left: 1px solid ${({ theme: { color } }) => color.devider};
  }
`;
const Counter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
  justify-content: center;
  width: 100%;
  height: 12rem;
  text-align: center;
`;

const SummaryWrapper = styled.div`
  padding: 3rem 4.5rem;
`;

const StyledHeading = styled.h3`
  margin-bottom: 2rem;
`;

const SummaryPosition = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  align-items: center;
  margin-bottom: 5rem;
`;

const SummaryPostionColumn = styled.div`
  text-align: center;
`;

const SummaryContainer = () => (
  <AppBodyContainer>
    <CountersBox>
      <Counter>
        <HeadingBlue>PENDING ORDERS</HeadingBlue>
        <p>15</p>
      </Counter>
      <Counter>
        <HeadingBlue>ORDERS WITHOUT INVOICE</HeadingBlue>
        <p>3</p>
      </Counter>
      <Counter>
        <HeadingBlue>DELAYED PAYMENTS</HeadingBlue>
        <p>13</p>
      </Counter>
    </CountersBox>
    <SummaryWrapper>
      <StyledHeading>Summary</StyledHeading>
      <SummaryPosition>
        <p>Orders in November:</p>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
      </SummaryPosition>
      <SummaryPosition>
        <p>Orders in November:</p>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
      </SummaryPosition>
      <SummaryPosition>
        <p>Orders in November:</p>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
        <SummaryPostionColumn>
          <p>all orders</p>
          <p>64</p>
        </SummaryPostionColumn>
      </SummaryPosition>
    </SummaryWrapper>
  </AppBodyContainer>
);

export default SummaryContainer;
