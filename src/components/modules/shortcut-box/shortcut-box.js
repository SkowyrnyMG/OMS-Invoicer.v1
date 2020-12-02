import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HeadingBlue from 'components/atoms/heading-blue/heading-blue';

const Wrapper = styled.button`
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: repeat(2, 1fr);
  padding-right: 3rem;
  height: 12rem;
  min-width: 24rem;
  width: 30%;
  text-align: left;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  border: 2px solid transparent;
  border-radius: 0.5rem;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
  transition: all 0.25s;
  cursor: pointer;

  :hover {
    border: 2px solid ${({ theme: { color } }) => color.primary};
  }

  svg {
    align-self: center;
    justify-self: center;
    grid-row: 1 / -1;
    grid-column: 1 / 2;
    width: 4rem;
    fill: ${({ theme: { color } }) => color.primary};
  }
`;

const StyledHeadingBlue = styled(HeadingBlue)`
  align-self: end;
`;

const StyledDescription = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  font-style: italic;
  color: ${({ theme: { color } }) => color.secondaryFont};
`;

const ShortcutBox = ({ children, title, description }) => (
  <Wrapper>
    {children}
    <StyledHeadingBlue>{title}</StyledHeadingBlue>
    <StyledDescription>{description}</StyledDescription>
  </Wrapper>
);

ShortcutBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ShortcutBox;
