import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SummaryPostionColumn from 'components/modules/summary-position-column/summary-position-column';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  align-items: center;
  margin-bottom: 5rem;
`;

const SummaryPosition = ({ posName }) => (
  <Wrapper>
    <p>{posName}</p>
    <SummaryPostionColumn colName='all orders' counter={64} />
    <SummaryPostionColumn colName='all orders' counter={64} />
    <SummaryPostionColumn colName='all orders' counter={64} />
    <SummaryPostionColumn colName='all orders' counter={64} />
  </Wrapper>
);

SummaryPosition.propTypes = {
  posName: PropTypes.string.isRequired,
};

export default SummaryPosition;
