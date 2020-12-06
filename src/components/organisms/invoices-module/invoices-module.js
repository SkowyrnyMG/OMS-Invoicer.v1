import React from 'react';
import styled from 'styled-components';

import AppTableBody from 'components/modules/app-table-body/app-table-body';
import ActionMenu from 'components/modules/action-menu/action-menu';

import { MOCK_DATA_INVOICES } from 'utils/dummy-data';
import { INVOICES_COLUMNS } from 'utils/table-columns';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-column-gap: 2rem;
`;

const InvoicesModule = () => (
  <Wrapper>
    <AppTableBody columns={INVOICES_COLUMNS} data={MOCK_DATA_INVOICES} />
    <ActionMenu />
  </Wrapper>
);

export default InvoicesModule;
