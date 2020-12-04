import React from 'react';
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

export default SummaryPositionColumn;
