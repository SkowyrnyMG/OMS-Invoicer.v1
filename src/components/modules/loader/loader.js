import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { gsap } from 'gsap';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  z-index: 50000;
  transition: 0.25 all;
`;

const LoaderIcon = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
`;

const LoaderDot = styled.div`
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  background: ${({ theme: { color } }) => color.primary};
  border-radius: 50%;

  transform-origin: center;

  :first-of-type {
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
  }
  :nth-of-type(2) {
    top: 50%;
    right: 0%;
    transform: translateY(-50%);
  }
  :nth-of-type(3) {
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
  }
  :nth-of-type(4) {
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
  }
`;

const LoadingInfo = styled.span`
  margin-top: 2rem;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

const Loader = () => {
  const animationWrapper = useRef(null);
  useEffect(() => {
    const animationContainer = animationWrapper.current;
    const loader = animationContainer.querySelector('div');
    const dots = loader.querySelectorAll('div');

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(loader, { duration: 2, rotate: 360, ease: 'none' });
    tl.to(dots[0], { duration: 1, y: '20' }, '-=2');
    tl.to(dots[0], { duration: 1, y: '0', delay: 1 }, '-=2');
    tl.to(dots[1], { duration: 1, x: '-20' }, '-=2');
    tl.to(dots[1], { duration: 1, x: '0', delay: 1 }, '-=2');
    tl.to(dots[2], { duration: 1, y: '-20' }, '-=2');
    tl.to(dots[2], { duration: 1, y: '0', delay: 1 }, '-=2');
    tl.to(dots[3], { duration: 1, x: '20' }, '-=2');
    tl.to(dots[3], { duration: 1, x: '0', delay: 1 }, '-=2');
  }, []);

  return (
    <Wrapper ref={animationWrapper}>
      <LoaderIcon>
        <LoaderDot />
        <LoaderDot />
        <LoaderDot />
        <LoaderDot />
      </LoaderIcon>
      <LoadingInfo>Loading...</LoadingInfo>
    </Wrapper>
  );
};

export default Loader;
