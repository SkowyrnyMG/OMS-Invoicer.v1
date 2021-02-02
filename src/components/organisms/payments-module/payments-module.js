import React, { useMemo, useState } from 'react';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { PAYMENTS_COLUMNS } from 'utils/table-columns';
import { MOCK_DATA_PAYMENTS } from 'utils/dummy-data';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

const PaymentsModule = () => {
  const [currentPayment, setCurrentPayments] = useState(null);
  const columns = useMemo(() => PAYMENTS_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA_PAYMENTS, []);
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);
  console.log(currentPayment);
  return (
    <AppGridContainer>
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        setCurrentPosValues={setCurrentPayments}
      />
      <ActionMenu>
        <Button>Add new</Button>
        <Button>Edit</Button>
        <Button>Mark payment</Button>
        <Button>Delete</Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default PaymentsModule;
