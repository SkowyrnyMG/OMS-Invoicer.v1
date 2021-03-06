import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import InvoiceControlModal from 'components/organisms/invoice-control-modal/invoice-control-modal';
import PDFRenderer from 'components/organisms/pdf-renderer/pdf-renderer';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { INVOICES_COLUMNS } from 'utils/table-columns';
import { STATUS_OPTION } from 'utils/constant-data';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

import {
  setInvoiceStatus,
  getAllInvoices,
} from 'store/slices/db-slice/db-slice';

const InvoicesModule = ({ invoicesList }) => {
  const dispatch = useDispatch();
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPDFWindowOpen, setIsPDFWindowOpen] = useState(false);
  const columns = useMemo(() => INVOICES_COLUMNS, []);
  const data = useMemo(() => invoicesList, [invoicesList]);
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setCurrentInvoice(null);
    setIsModalOpen(true);
  };

  const handleStatusClick = async (status) => {
    const invoiceNumber = currentInvoice.invoice_number;
    await dispatch(setInvoiceStatus({ invoiceNumber, status }));
    dispatch(getAllInvoices());
  };

  const handlePrintClick = () => {
    setIsPDFWindowOpen(true);
  };

  return (
    <AppGridContainer>
      {isModalOpen && (
        <InvoiceControlModal
          closeModal={() => setIsModalOpen(false)}
          currentInvoice={currentInvoice}
        />
      )}
      {isPDFWindowOpen && (
        <PDFRenderer
          closeRenderer={() => setIsPDFWindowOpen(false)}
          currentInvoice={currentInvoice}
        />
      )}
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        setCurrentPosValues={setCurrentInvoice}
        isModalOpen={isModalOpen}
      />
      <ActionMenu>
        <Button onClick={handleAddNewClick}>Add new</Button>
        <Button disabled={currentInvoice === null} onClick={handleEditClick}>
          Edit
        </Button>
        <Button
          disabled={
            currentInvoice === null ||
            !currentInvoice.payment_status.match(/unpaid/i)
          }
          onClick={() => handleStatusClick(STATUS_OPTION.invoice.cancelled)}
        >
          Cancel
        </Button>
        <Button
          disabled={
            currentInvoice === null ||
            currentInvoice.payment_status.match(/cancelled/i) ||
            currentInvoice.payment_status.match(/^\paid/i)
          }
          onClick={() => handleStatusClick(STATUS_OPTION.invoice.paid)}
        >
          Mark as paid
        </Button>
        <Button onClick={handlePrintClick} disabled={currentInvoice === null}>
          Print
        </Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default InvoicesModule;
