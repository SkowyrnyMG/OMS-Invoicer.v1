import React from 'react';
import styled from 'styled-components';
import NavLink from 'components/atoms/nav-link/nav-link';

import { routes } from 'utils/routes';

const Wrapper = styled.header`
  grid-column: top-bar-start / top-bar-end !important;
  display: grid;
  grid-template-columns: [logo-start] 24rem [logo-end middle-bar-start] 1fr [middle-bar-end nav-start] 27rem [nav-end];
  justify-items: center;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  height: 6rem;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  box-shadow: ${({ theme: { shadow } }) => shadow.bottom};
  z-index: 50;
`;

const Logo = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.cta};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;
const StyledLoginNav = styled.nav`
  grid-column: nav-start / nav-end;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopBar = () => (
  <Wrapper>
    <NavLink path={routes.home}>
      <Logo>OMS Invoicer.v1</Logo>
    </NavLink>
    <StyledLoginNav>
      <NavLink linktype='login' path={routes.login}>
        Sign in
      </NavLink>
      <NavLink linktype='logout' path={routes.register}>
        Sign up
      </NavLink>
    </StyledLoginNav>
  </Wrapper>
);

export default TopBar;
