import React, { useMemo } from 'react';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { CUSTOMERS_COLUMNS } from 'utils/table-columns';
// import { MOCK_DATA } from 'utils/dummy-data';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

const CustomersModule = ({ customersList, openModal }) => {
  const columns = useMemo(() => CUSTOMERS_COLUMNS, []);
  const data = useMemo(() => customersList, [customersList]);
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);

  return (
    <AppGridContainer>
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
      />
      <ActionMenu>
        <Button onClick={openModal}>Add new</Button>
        <Button>Edit</Button>
        <Button>delete</Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default CustomersModule;
