import React from 'react';
import styled from 'styled-components';

import NavLink from 'components/atoms/nav-link/nav-link';
import { ReactComponent as LogoSvg } from 'assets/svg/logo.svg';
import { routes } from 'utils/routes';

const LogoWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

const StyledLogoSvg = styled(LogoSvg)`
  width: 6rem;
`;

const Logo = () => (
  <NavLink path={routes.home}>
    <LogoWrapper>
      <StyledLogoSvg />
      Invoicer.v1
    </LogoWrapper>
  </NavLink>
);

export default Logo;
