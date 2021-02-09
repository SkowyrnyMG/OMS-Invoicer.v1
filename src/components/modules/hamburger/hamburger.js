import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  position: absolute;
  padding: 1rem;
  width: 6rem;
  height: 6rem;
  background: ${({ theme: { color } }) => color.primary};
  border: none;
  outline: none;
  border-bottom-right-radius: 20%;
  box-shadow: ${({ theme: { shadow } }) => shadow.bottom};
  z-index: 10000;
  pointer-events: auto;
  cursor: pointer;
`;

const Bar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 0.3rem;
  background: ${({ theme: { color } }) => color.bgSecondary};
  transition: all 0.25s;

  :first-child {
    transform: ${({ isMenuOpen }) =>
      isMenuOpen
        ? `translate(-50%, -50%) rotate(225deg)`
        : 'translate(-50%, -350%)'};
  }
  :nth-child(2) {
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? 0 : 1)};
    transform: translate(-50%, -50%);
  }
  :last-child {
    transform: ${({ isMenuOpen }) =>
      isMenuOpen
        ? `translate(-50%, -50%) rotate(-225deg)`
        : 'translate(-50%, 250%)'};
  }
`;

const Hamburger = ({ isMenuOpen, toggleMenu }) => {
  return (
    <Wrapper onClick={toggleMenu}>
      <Bar isMenuOpen={isMenuOpen} />
      <Bar isMenuOpen={isMenuOpen} />
      <Bar isMenuOpen={isMenuOpen} />
    </Wrapper>
  );
};

export default Hamburger;
