import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import AddNewCustomerModal from 'components/organisms/add-new-customer-modal/add-new-customer-modal';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { CUSTOMERS_COLUMNS } from 'utils/table-columns';
import { useDefaultColumn } from 'hooks/useDefaultColumn';
import { deleteCustomer } from 'store/slices/db-slice/db-slice';

const CustomersModule = ({ customersList }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const columns = useMemo(() => CUSTOMERS_COLUMNS, []);
  const data = useMemo(
    () =>
      customersList.length > 0
        ? customersList
        : [{ address: '', vat_number: '', name: '' }],
    [customersList]
  );
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);

  const handleDeleteClick = (cred) => {
    dispatch(deleteCustomer(cred));
  };

  return (
    <AppGridContainer>
      {isModalOpen && (
        <AddNewCustomerModal closeModal={() => setIsModalOpen(false)} />
      )}
      <AppTableBody
        setCurrentCustomer={setCurrentCustomer}
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
      />
      <ActionMenu>
        <Button onClick={() => setIsModalOpen(true)}>Add new</Button>
        <Button>Edit</Button>
        <Button
          onClick={() => handleDeleteClick(currentCustomer)}
          disabled={currentCustomer === null}
        >
          delete
        </Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default CustomersModule;
