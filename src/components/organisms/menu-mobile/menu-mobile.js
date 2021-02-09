import React, { useState } from 'react';
import styled from 'styled-components';

import AppNavigation from 'components/modules/app-navigation/app-navigation';
import Hamburger from 'components/modules/hamburger/hamburger';

const Wrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  z-index: 1000;
  pointer-events: none;
  display: none;

  ${({ theme: { mq } }) => mq.desktop} {
    display: block;
  }
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.25s opacity;
  pointer-events: none;

  // * delete border from nav items
  span {
    border-bottom: none !important;
  }

  ${({ theme: { mq } }) => mq.desktop} {
    pointer-events: ${({ isMenuOpen }) => (isMenuOpen ? 'auto' : 'none')};
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};

    ul {
      margin: 0 auto;
      width: fit-content;
      min-width: 15rem;
    }
  }
`;

const MenuMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMenuOpen((state) => !state);
  };
  return (
    <Wrapper>
      <Hamburger isMenuOpen={isMenuOpen} toggleMenu={handleHamburgerClick} />
      <MenuWrapper isMenuOpen={isMenuOpen}>
        <AppNavigation />
      </MenuWrapper>
    </Wrapper>
  );
};

export default MenuMobile;
