import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem 0.5rem;
  width: 100%;
  min-height: 5rem;
  border-top: 1px solid ${({ theme: { color } }) => color.transparentMain};
  img {
    display: block;
    margin: 0 auto;
    width: 50%;
    min-width: 20rem;
  }
`;

const StyledHeading = styled.h5`
  width: 100%;
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  color: ${({ theme: { color } }) => color.secondaryFont};
  cursor: pointer;
  * {
    margin: 1rem;
  }
`;

const FAQPosition = ({ title, children }) => {
  const [isFaqPosOpen, setIsFaqPosOpen] = useState(false);
  return (
    <Wrapper>
      <StyledHeading onClick={() => setIsFaqPosOpen((state) => !state)}>
        <span>{isFaqPosOpen ? '-' : '+'}</span>
        <span>{title}</span>
      </StyledHeading>
      {isFaqPosOpen && <p>{children}</p>}
    </Wrapper>
  );
};

FAQPosition.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default FAQPosition;
