import React from 'react';
import styled from 'styled-components';

import AppNavigation from 'components/modules/app-navigation/app-navigation';

const Wrapper = styled.div`
  position: fixed;
  width: 15%;
  height: 100%;
  box-shadow: ${({ theme: { shadow } }) => shadow.right};
  z-index: 1000;

  ${({ theme: { mq } }) => mq.desktop} {
    display: none;
  }
`;

const MenuDesktop = () => (
  <Wrapper>
    <AppNavigation />
  </Wrapper>
);

export default MenuDesktop;
