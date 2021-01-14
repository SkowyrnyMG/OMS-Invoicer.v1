import React, { useMemo, useState } from 'react';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import InvoiceControlModal from 'components/organisms/invoice-control-modal/invoice-control-modal';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { INVOICES_COLUMNS } from 'utils/table-columns';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

const InvoicesModule = ({ invoicesList }) => {
  console.log(invoicesList);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = useMemo(() => INVOICES_COLUMNS, []);
  const data = useMemo(() => invoicesList, [invoicesList]);
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);
  console.log(currentInvoice);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setCurrentInvoice(null);
    setIsModalOpen(true);
  };

  return (
    <AppGridContainer>
      {isModalOpen && (
        <InvoiceControlModal
          closeModal={() => setIsModalOpen(false)}
          currentInvoice={currentInvoice}
        />
      )}
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        setCurrentPosValues={setCurrentInvoice}
      />
      <ActionMenu>
        <Button onClick={handleAddNewClick}>Add new</Button>
        <Button disabled={currentInvoice === null} onClick={handleEditClick}>
          Edit
        </Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default InvoicesModule;
