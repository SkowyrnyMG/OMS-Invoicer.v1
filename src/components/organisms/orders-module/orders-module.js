import React, { useMemo } from 'react';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { ORDERS_COUMNS } from 'utils/table-columns';
import { MOCK_DATA_ORDERS } from 'utils/dummy-data';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

const OrdersModule = () => {
  const columns = useMemo(() => ORDERS_COUMNS, []);
  const data = useMemo(() => MOCK_DATA_ORDERS, []);
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
        <Button>Add new</Button>
        <Button>Edit</Button>
        <Button>Issue invoice</Button>
        <Button>delete</Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default OrdersModule;
