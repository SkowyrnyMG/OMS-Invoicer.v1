import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  border-radius: 5px;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
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
  margin-bottom: 2.5rem;
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.ms};
`;

const Feature = ({ children, title, textContent }) => (
  <Wrapper>
    <SvgBox>{children}</SvgBox>
    <StyledHeading>{title}</StyledHeading>
    <StyledParagraph>{textContent}</StyledParagraph>
  </Wrapper>
);

Feature.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  textContent: PropTypes.string.isRequired,
};

export default Feature;
