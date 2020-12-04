import React from 'react';
import styled from 'styled-components';

import AppTableBody from 'components/modules/app-table-body/app-table-body';
import ActionMenu from 'components/modules/action-menu/action-menu';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-column-gap: 2rem;
`;

const InvoicesModule = () => (
  <Wrapper>
    <AppTableBody />
    <ActionMenu />
  </Wrapper>
);

export default InvoicesModule;
