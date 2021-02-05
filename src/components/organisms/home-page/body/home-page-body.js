import React from 'react';
import styled from 'styled-components';

import Feature from 'components/modules/feature/feature';
import HomePageDetailsSection from 'components/organisms/home-page/home-page-details-section/home-page-details-section';
import NavLink from 'components/atoms/nav-link/nav-link';
import Logo from 'components/modules/logo/logo';
import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';
import { ReactComponent as OkIcon } from 'assets/svg/ok-icon.svg';
import { ReactComponent as CashIcon } from 'assets/svg/cash-icon.svg';
import { ReactComponent as DashboardIcon } from 'assets/svg/dashboard-icon.svg';
import pattern from 'assets/images/bg-pattern.png';

import { routes } from 'utils/routes';

const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: 5rem [start] repeat(3, 1fr) [end] 5rem;
  grid-auto-rows: minmax(min-content);
  grid-column-gap: 3%;
  margin: 0;
  > *:not(section) {
    grid-column: start / end;
  }

  > section {
    grid-column: -1 / 1 !important;
  }
`;

const PatternSection = styled.section`
  grid-column: -1 / 1;
  display: grid;
  grid-template-columns: 5rem [start] 1fr [end] 5rem;
  grid-column-gap: 3%;
  padding: 20rem 0;
  position: relative;
  background-image: url(${pattern});
  background-size: cover;
  background-position: center;

  > * {
    grid-column: start / end;
  }
`;

const RevertPatternSection = styled(PatternSection)`
  background-position: center;
`;

const StyledBodyHeading = styled.h2`
  font-size: ${({ theme: { fontSize } }) => fontSize.heading};
  color: ${({ theme: { color } }) => color.danger};
  text-align: center;
  grid-column: start / end;
`;

const InfoBox = styled.div`
  margin: 0 auto;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  padding: 3rem 8.5rem;
  width: fit-content;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  border-radius: 5px;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
`;

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

const Banner = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 20%;
  grid-column: 1 / -1 !important;
  height: 20rem;
  background: ${({ theme: { color } }) => color.primary};
  background-image: url(${pattern});
  background-position: bottom left;

  > * {
    color: ${({ theme: { color } }) => color.tertiaryFont} !important;
  }
`;

const HomePageBody = () => (
  <BodyWrapper>
    <PatternSection>
      <FeatureInfo>
        <h2>6 reasons to choose OMS invoicer</h2>
        <p>
          OMS is here for you! Adding customer, orders and invoices never been
          easier! Typos and simple mistakes on your invoices will never trouble
          you again! All customer data can be fetched from VIES database!
        </p>
      </FeatureInfo>
      <FeatureWrapper>
        <Feature title='Customers details in one place' counter='1'>
          <ClientsIcon />
        </Feature>
        <Feature
          title='Take control over your
            orders'
          counter='2'
        >
          <OrdersIcon />
        </Feature>
        <Feature title='Easy invoicing' counter='3'>
          <InvoiceIcon />
        </Feature>
        <Feature title='Instant VIES verification' counter='4'>
          <OkIcon />
        </Feature>
        <Feature title='Keep your payments under control' counter='5'>
          <CashIcon />
        </Feature>
        <Feature title='Useful dashboard notifications' counter='6'>
          <DashboardIcon />
        </Feature>
      </FeatureWrapper>
    </PatternSection>
    <HomePageDetailsSection />
    <Banner>
      <Logo />
      <h3>Are you ready to get started?</h3>
      <NavLink path={routes.register}>Register now!</NavLink>
    </Banner>
    <RevertPatternSection>
      <StyledBodyHeading>IMPORTANT!</StyledBodyHeading>
      <InfoBox>
        This app was created for learning purpuses. Please do not use it to
        issue real inovice or to keep real customer data!
      </InfoBox>
    </RevertPatternSection>
  </BodyWrapper>
);

export default HomePageBody;
