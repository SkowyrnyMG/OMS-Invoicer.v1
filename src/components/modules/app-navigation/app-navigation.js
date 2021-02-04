import React from 'react';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'assets/svg/home-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';
// import { ReactComponent as PaymentIcon } from 'assets/svg/payment-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svg/settings-icon.svg';
import { ReactComponent as HelpIcon } from 'assets/svg/help-icon.svg';
import Logo from 'components/modules/logo/logo';

import { routes } from 'utils/routes';

const Wrapper = styled.div`
  position: fixed;
  width: 15%;
  height: 100vh;
  grid-row: 1 / -1;
  display: grid;
  grid-template-rows: 6rem 1fr;
  background: ${({ theme: { color } }) => color.bgSecondary};
  box-shadow: ${({ theme: { shadow } }) => shadow.right};
  z-index: 1000;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 5rem;

  .active-app-link {
    color: ${({ theme: { color } }) => color.primary} !important;
    fill: currentColor !important;
    font-weight: bold;
  }
`;

const StyledList = styled.ul`
  width: 85%;
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;

  svg {
    margin-right: 1.3rem;
    width: 2.4rem !important;
  }
`;

const AppNavLink = styled(Link)`
  display: inline-block;
  width: 100%;
  font-size: ${({ theme: { fontSize } }) => fontSize.regular};
`;

const AppNavLinkText = styled.span`
  display: inline-block;
  width: calc(100% - 5rem);
  height: 6rem;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  line-height: 6rem;
`;

const AppNavigation = () => (
  <Wrapper>
    <Logo />
    <StyledNav>
      <StyledList>
        <StyledListItem>
          <AppNavLink
            exact
            to={routes.app}
            activeClassName='active-app-link'
            data-testid='maindesk-link'
          >
            <HomeIcon />
            <AppNavLinkText>Main desk</AppNavLinkText>
          </AppNavLink>
        </StyledListItem>

        <StyledListItem>
          <AppNavLink
            to={routes.appInvoices}
            activeClassName='active-app-link'
            data-testid='invoices-link'
          >
            <InvoiceIcon />
            <AppNavLinkText>Invoices</AppNavLinkText>
          </AppNavLink>
        </StyledListItem>

        {/* <StyledListItem>
          <AppNavLink
            to={routes.appPayments}
            activeClassName='active-app-link'
            data-testid='payments-link'
          >
            <PaymentIcon />
            <AppNavLinkText>Payments</AppNavLinkText>
          </AppNavLink>
        </StyledListItem> */}

        <StyledListItem>
          <AppNavLink
            to={routes.appOrders}
            activeClassName='active-app-link'
            data-testid='orders-link'
          >
            <OrdersIcon />
            <AppNavLinkText>Orders</AppNavLinkText>
          </AppNavLink>
        </StyledListItem>

        <StyledListItem>
          <AppNavLink
            to={routes.appCustomers}
            activeClassName='active-app-link'
            data-testid='customers-link'
          >
            <ClientsIcon />
            <AppNavLinkText>Customers</AppNavLinkText>
          </AppNavLink>
        </StyledListItem>
      </StyledList>
      <StyledList>
        <StyledListItem>
          <AppNavLink
            exact
            to={routes.appSettings}
            activeClassName='active-app-link'
            data-testid='settings-link'
          >
            <SettingsIcon />
            <AppNavLinkText>Settings</AppNavLinkText>
          </AppNavLink>
        </StyledListItem>
        <StyledListItem>
          <AppNavLink
            exact
            to={routes.appHelp}
            activeClassName='active-app-link'
            data-testid='help-link'
          >
            <HelpIcon />
            <AppNavLinkText>Help</AppNavLinkText>
          </AppNavLink>
        </StyledListItem>
      </StyledList>
    </StyledNav>
  </Wrapper>
);

export default AppNavigation;
