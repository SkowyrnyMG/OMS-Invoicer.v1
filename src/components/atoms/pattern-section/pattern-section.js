import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSection = styled.section`
  grid-column: -1 / 1;
  display: grid;
  grid-template-columns: 5rem [start] 1fr [end] 5rem;
  grid-column-gap: 3%;
  padding: 20rem 0;
  position: relative;
  background-image: url(${({ patternUrl }) => patternUrl});
  background-size: cover;
  background-position: center;

  > * {
    grid-column: start / end;
  }
`;

const PatternSection = ({ children, patternUrl }) => (
  <StyledSection patternUrl={patternUrl}>{children}</StyledSection>
);

PatternSection.propTypes = {
  children: PropTypes.node.isRequired,
  patternUrl: PropTypes.string.isRequired,
};

export default PatternSection;
