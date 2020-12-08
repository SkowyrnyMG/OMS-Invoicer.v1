import React, { useMemo } from 'react';
import styled from 'styled-components';

import AppTableBody from 'components/modules/app-table-body/app-table-body';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { CUSTOMERS_COLUMNS } from 'utils/table-columns';
import { MOCK_DATA } from 'utils/dummy-data';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-column-gap: 2rem;
`;

const CustomersModule = () => {
  const columns = useMemo(() => CUSTOMERS_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);

  return (
    <Wrapper>
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
      />
      <ActionMenu>
        <Button>Add new</Button>
        <Button>Edit</Button>
        <Button>delete</Button>
      </ActionMenu>
    </Wrapper>
  );
};

export default CustomersModule;
