import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const SummaryPositionColumn = ({ colName, counter }) => (
  <Wrapper>
    <p>{colName}</p>
    <p>{counter}</p>
  </Wrapper>
);

SummaryPositionColumn.propTypes = {
  colName: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};

export default SummaryPositionColumn;
