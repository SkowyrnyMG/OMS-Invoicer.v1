import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 3%;
  left: 1%;
  pointer-events: none;
  * {
    pointer-events: auto;
  }
`;

const HelpButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  line-height: 4rem;
  color: ${({ theme: { color } }) => color.primary};
  background: transparent;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  border-radius: 50%;
  border: 2px solid currentColor;
  outline: none;
  cursor: help;
`;

const ToolTip = styled.div`
  position: absolute;
  top: 200%;
  left: 0;
  padding: 1rem 2rem;
  min-width: 30rem;
  max-width: 40rem;
  height: fit-content;
  color: ${({ theme: { color } }) => color.bgSecondary};
  line-height: 1.2;
  text-align: left;
  background: ${({ theme: { color } }) => color.primary};
  border-radius: 0.5rem;
  opacity: ${({ isToolTipOpen }) => (isToolTipOpen ? 1 : 0)};
  transform: ${({ isToolTipOpen }) =>
    isToolTipOpen ? 'translateY(0) scaleY(1)' : 'translateY(-3rem) scale(0)'};

  transition: all 0.25s;

  &::before {
    content: '';
    position: absolute;
    top: -1.8rem;
    left: 0.5rem;
    width: 2rem;
    height: 2rem;
    background-color: ${({ theme: { color } }) => color.primary};
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    z-index: 10000;
  }
`;

const HelpToolTip = ({ info }) => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  return (
    <Wrapper>
      <HelpButton onClick={() => setIsToolTipOpen((state) => !state)}>
        ?
      </HelpButton>
      <ToolTip isToolTipOpen={isToolTipOpen}>{info}</ToolTip>
    </Wrapper>
  );
};

HelpToolTip.propTypes = {
  info: PropTypes.string.isRequired,
};

export default HelpToolTip;
