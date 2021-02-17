import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  border-radius: 5px;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
  overflow: hidden;
`;

const SvgBox = styled.div`
  max-height: 10rem;
  margin-bottom: 3rem;
  svg {
    width: 8rem !important;
    fill: ${({ theme: { color } }) => color.primary};
  }
`;

const StyledHeading = styled.h3`
  font-size: ${({ theme: { fontSize } }) => fontSize.regular};
`;

const Counter = styled.div`
  position: absolute;
  bottom: -4%;
  line-height: 0.8;
  left: -2%;
  font-family: 'Montserrat';
  color: ${({ theme: { color } }) => color.transparentMain};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  font-size: ${({ theme: { fontSize } }) => fontSize.headingBig};
`;

const Feature = ({ children, title, counter }) => {
  return (
    <Wrapper>
      <SvgBox>{children}</SvgBox>
      <StyledHeading>{title}</StyledHeading>
      <Counter>{counter}</Counter>
    </Wrapper>
  );
};

Feature.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};

export default Feature;
