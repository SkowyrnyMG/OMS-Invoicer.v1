import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { NavLink as Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'assets/svg/home-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svg/settings-icon.svg';
import { ReactComponent as HelpIcon } from 'assets/svg/help-icon.svg';
import { ReactComponent as LogoutIcon } from 'assets/svg/logout-icon.svg';
import Logo from 'components/modules/logo/logo';

import { routes } from 'utils/routes';
import { logoutUser } from 'store/slices/auth-slice/auth-slice';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  grid-row: 1 / -1;
  display: grid;
  grid-template-rows: 6rem 1fr;
  background: ${({ theme: { color } }) => color.bgSecondary};
  z-index: 1000;
  overflow-y: auto;
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
`;

const AppNavLinkText = styled.span`
  display: inline-block;
  width: calc(100% - 5rem);
  height: 6rem;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  line-height: 6rem;
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  margin: 2rem 0;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  color: ${({ theme: { color } }) => color.danger};
  background: none;
  border: none;
  border-left: 1px solid ${({ theme: { color } }) => color.devider};
  cursor: pointer;
  transition: 0.25s transform;

  *:not(:last-child) {
    margin-right: 1rem;
  }
  :hover {
    transform: translateX(5px);
  }
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  fill: ${({ theme: { color } }) => color.danger};
`;

const AppNavigation = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
  };
  return (
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
          <LogoutBtn onClick={handleClick}>
            <StyledLogoutIcon />
            <span>Logout</span>
          </LogoutBtn>
        </StyledList>
      </StyledNav>
    </Wrapper>
  );
};

export default AppNavigation;
