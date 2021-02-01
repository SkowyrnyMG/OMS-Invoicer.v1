import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  flex-basis: 30%;
  max-width: 30%;
  height: 20rem;
  color: ${({ theme: { color } }) => color.bgSecondary};
  background: ${({ bgColor }) => bgColor};
  border-radius: 0.5rem;
  overflow: hidden;

  svg {
    position: absolute;
    top: 50%;
    right: 5%;
    width: 10rem;
    fill: currentColor;
    opacity: 0.5;
    transform: translateY(-50%);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledCounter = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

const ViewMoreButton = styled(Link)`
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  color: inherit !important;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  text-align: center;
  background: ${({ theme: { color } }) => color.transparentDark};
  transform: translateX(-50%);
`;

const TotalItemCounter = ({ bgColor, title, children, path, counter }) => {
  return (
    <Wrapper bgColor={bgColor}>
      <ContentWrapper>
        <StyledCounter>{counter}</StyledCounter>
        <h3>{title}</h3>
        {children}
      </ContentWrapper>
      <ViewMoreButton to={path}>View more..</ViewMoreButton>
    </Wrapper>
  );
};

TotalItemCounter.defaultProps = {
  children: '',
};

TotalItemCounter.propTypes = {
  bgColor: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};

export default TotalItemCounter;
