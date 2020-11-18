import React from 'react';
import styled from 'styled-components';

import Feature from 'components/modules/feature/feature';
import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';

const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: [start] repeat(3, 1fr) [end];
  grid-gap: 8%;
  margin: 0 10% 20rem;
  padding-top: 10rem;
`;

const StyledBodyHeading = styled.h2`
  font-size: ${({ theme: { fontSize } }) => fontSize.heading};
  color: ${({ theme: { color } }) => color.danger};
  text-align: center;
  grid-column: start / end;
`;

const InfoBox = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 10rem;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  padding: 3rem 8.5rem;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  border-radius: 5px;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
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
  </BodyWrapper>
);

export default HomePageBody;
