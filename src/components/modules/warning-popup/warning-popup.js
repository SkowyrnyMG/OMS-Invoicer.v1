import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gsap from 'gsap';

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
  height: fit-content;
  background: ${({ theme: { color } }) => color.bg};
  border-radius: 5px;
`;

const StyledHeading = styled.h3`
  margin: 2rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.cta} !important;
`;

const StyledParagraph = styled.p`
  padding: 2rem;
  text-align: left;
`;

const WarningPopup = ({ children, isWarningOpen, title }) => {
  const animationWrapper = useRef(null);

  useEffect(() => {
    const animationContainer = animationWrapper.current;
    gsap.from(animationContainer, { autoAlpha: 0, duration: 0.5, delay: 0.5 });
  }, []);

  return (
    <Wrapper isWarningOpen={isWarningOpen} ref={animationWrapper}>
      <ContentWrapper>
        <StyledHeading>{title}</StyledHeading>
        <StyledParagraph>{children}</StyledParagraph>
      </ContentWrapper>
    </Wrapper>
  );
};

WarningPopup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WarningPopup;
