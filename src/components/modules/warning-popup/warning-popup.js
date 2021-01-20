import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme: { color } }) => color.transparentDark};
  z-index: 50000;
  backdrop-filter: blur(2px);
  display: ${({ isWarningOpen }) => (isWarningOpen ? 'flex' : 'none')};
`;

const ContentWrapper = styled.div`
  position: absolute;
  text-align: center;
  padding: 2rem 3rem;
  width: 80%;
  height: 50%;
  background: ${({ theme: { color } }) => color.bg};
  border-radius: 5px;
`;

const StyledHeading = styled.h3`
  margin: 5rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall} !important;
`;

const StyledParagraph = styled.p`
  padding: 2rem;
  text-align: left;
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
`;

const WarningPopup = ({ children, isWarningOpen, title }) => (
  <Wrapper isWarningOpen={isWarningOpen}>
    <ContentWrapper>
      <StyledHeading>{title}</StyledHeading>
      <StyledParagraph>{children}</StyledParagraph>
    </ContentWrapper>
  </Wrapper>
);

WarningPopup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WarningPopup;
