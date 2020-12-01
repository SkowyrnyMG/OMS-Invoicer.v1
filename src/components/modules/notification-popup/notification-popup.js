import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gsap } from 'gsap';

import ErrorMsg from 'components/atoms/error-msg/error-msg';
import SuccessMsg from 'components/atoms/success-msg/success-msg';

const Wrapper = styled.div`
  margin: -2rem 0 2rem;
`;

const NotificationPopup = ({ children, successRegexp }) => {
  const animationWrapper = useRef(null);
  useEffect(() => {
    const animationContainer = animationWrapper.current;
    const messageSpan = animationContainer.querySelector('span');
    const submitButton = document.querySelector('button');

    const tl = gsap.timeline();

    gsap.set(messageSpan, { autoAlpha: 0 });

    const showHideMsg = () => {
      tl.fromTo(
        messageSpan,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, delay: 1 }
      );
      tl.to(messageSpan, { autoAlpha: 0, duration: 1, delay: 5 });
    };

    submitButton.addEventListener('click', showHideMsg);

    return () => submitButton.removeEventListener('click', showHideMsg);
  });
  return (
    <Wrapper ref={animationWrapper}>
      {children.match(new RegExp(successRegexp, 'i')) ? (
        <SuccessMsg>{children}</SuccessMsg>
      ) : (
        <ErrorMsg>{children}</ErrorMsg>
      )}
    </Wrapper>
  );
};

NotificationPopup.propTypes = {
  successRegexp: PropTypes.string.isRequired,
};

export default NotificationPopup;
