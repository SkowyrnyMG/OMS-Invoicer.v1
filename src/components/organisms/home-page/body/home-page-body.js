import React from 'react';
import styled from 'styled-components';

import Feature from 'components/modules/feature/feature';
import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';
import WideInfoBlock from 'components/modules/wide-info-block/wide-info-block';

const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: 5rem [start] repeat(3, 1fr) [end] 5rem;
  grid-auto-rows: minmax(min-content);
  grid-gap: 3%;
  grid-row-gap: 5%;
  margin: 0 0 20rem;
  padding-top: 10rem;
  > * {
    grid-column: start / end;
  }
`;

const StyledBodyHeading = styled.h2`
  font-size: ${({ theme: { fontSize } }) => fontSize.heading};
  color: ${({ theme: { color } }) => color.danger};
  text-align: center;
  grid-column: start / end;
`;

const InfoBox = styled.div`
  margin-bottom: 10rem;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  padding: 3rem 8.5rem;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  border-radius: 5px;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
`;

const FeatureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3%;
`;

const FeatureInfo = styled.div`
  width: 65vw;

  > * {
    margin-bottom: 5rem;
  }
`;

const HomePageBody = () => (
  <BodyWrapper>
    <StyledBodyHeading>IMPORTANT!</StyledBodyHeading>
    <InfoBox>
      This app does not deliver to you ready to use in commercial aspect final
      product. It has been made only as a coding workout. Please do not provide
      to the app any real customers data. If you like my project or if you have
      some comments, tips or hints that could help me improve this app please
      send me some feedback!
    </InfoBox>
    <FeatureInfo>
      <h2>Not enought time to track your orders?</h2>
      <p>
        You are in the right place! OMS is here for you! Adding customer, orders
        and invoices never been easier! Typos and simple mistakes on your
        invoices will never trouble you again! All customer data can be fetched
        from VIES database!
      </p>
    </FeatureInfo>
    <FeatureWrapper>
      <Feature
        title='Storage for client details'
        textContent='Forget about phonebooks,
                  contact lists, etc. In OMS you
                  can save all your client info
                  in one place.'
      >
        <ClientsIcon />
      </Feature>
      <Feature
        title='Take control over your
            orders'
        textContent='With OMS you will never
                  forgot about your client
                  orders. You can set order
                  status to be 100% if job
                  is finished or not!'
      >
        <OrdersIcon />
      </Feature>
      <Feature
        title='Easy invoicing'
        textContent='Tired of typos on invoices?
                  OMS will create a draft of
                  invoice based on order!'
      >
        <InvoiceIcon />
      </Feature>
    </FeatureWrapper>
    <WideInfoBlock>4</WideInfoBlock>
  </BodyWrapper>
);

export default HomePageBody;
