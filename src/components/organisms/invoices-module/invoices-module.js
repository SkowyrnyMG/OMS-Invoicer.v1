import React, { useMemo, useState } from 'react';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { MOCK_DATA_INVOICES } from 'utils/dummy-data';
import { INVOICES_COLUMNS } from 'utils/table-columns';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

const InvoicesModule = () => {
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const columns = useMemo(() => INVOICES_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA_INVOICES, []);
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);
  console.log(currentInvoice);

  return (
    <AppGridContainer>
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        setCurrentPosValues={setCurrentInvoice}
      />
      <ActionMenu>
        <Button>Add new</Button>
        <Button>Edit</Button>
        <Button>delete</Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default InvoicesModule;
