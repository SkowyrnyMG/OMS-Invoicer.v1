import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HeadingBlue from 'components/atoms/heading-blue/heading-blue';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
  justify-content: center;
  width: 100%;
  height: 12rem;
  text-align: center;

  :not(:first-of-type) {
    border-left: 1px solid ${({ theme: { color } }) => color.devider};
  }

  ${({ theme: { mq } }) => mq.mediumTablet} {
    border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  }
`;

const SummaryCounter = ({ title, counter }) => (
  <Wrapper>
    <HeadingBlue>{title}</HeadingBlue>
    <p>{counter}</p>
  </Wrapper>
);

SummaryCounter.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};

export default SummaryCounter;
