import React from 'react';
import styled from 'styled-components';

import PatternSection from 'components/atoms/pattern-section/pattern-section';
import Feature from 'components/modules/feature/feature';

import pattern from 'assets/images/bg-pattern.png';
import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';
import { ReactComponent as OkIcon } from 'assets/svg/ok-icon.svg';
import { ReactComponent as CashIcon } from 'assets/svg/cash-icon.svg';
import { ReactComponent as DashboardIcon } from 'assets/svg/dashboard-icon.svg';

const FeatureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
`;

const FeatureInfo = styled.div`
  width: 65vw;

  > * {
    margin-bottom: 5rem;
  }
`;

const featuresData = [
  {
    title: 'Customers details in one place',
    icon: <ClientsIcon />,
  },
  {
    title: 'Take control over your orders',
    icon: <OrdersIcon />,
  },
  {
    title: 'Easy invoicing',
    icon: <InvoiceIcon />,
  },
  {
    title: 'Instant VIES verification',
    icon: <OkIcon />,
  },
  {
    title: 'Keep your payments under control',
    icon: <CashIcon />,
  },
  {
    title: 'Useful dashboard notifications',
    icon: <DashboardIcon />,
  },
];

const HomePageFeaturesSection = () => (
  <PatternSection patternUrl={pattern}>
    <FeatureInfo>
      <h2>6 reasons to choose OMS invoicer</h2>
      <p>
        OMS is here for you! Adding customer, orders and invoices never been
        easier! Typos and simple mistakes on your invoices will never trouble
        you again! All customer data can be fetched from VIES database!
      </p>
    </FeatureInfo>
    <FeatureWrapper>
      {featuresData.map(({ title, icon }, index) => (
        <Feature title={title} counter={index + 1} key={title}>
          {icon}
        </Feature>
      ))}
    </FeatureWrapper>
  </PatternSection>
);

export default HomePageFeaturesSection;
