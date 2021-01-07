import React, { useMemo, useState } from 'react';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import AddNewOrderModal from 'components/organisms/add-new-order-modal/add-new-order-modal';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { ORDERS_COLUMNS } from 'utils/table-columns';
import { useDefaultColumn } from 'hooks/useDefaultColumn';

const OrdersModule = ({ ordersList }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = useMemo(() => ORDERS_COLUMNS, []);
  const data = useMemo(
    () =>
      ordersList
        ? ordersList
        : [{ desc: '', order_number: '', price: '', status: '', email: '' }],
    [ordersList]
  );
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);
  console.log(currentOrder);
  console.log('lista orderdów');
  console.log(ordersList);

  return (
    <AppGridContainer>
      {isModalOpen && (
        <AddNewOrderModal closeModal={() => setIsModalOpen(false)} />
      )}
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        setCurrentPosValues={setCurrentOrder}
      />
      <ActionMenu>
        <Button onClick={() => setIsModalOpen(true)}>Add new</Button>
        <Button>Edit</Button>
        <Button>Issue invoice</Button>
        <Button>delete</Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default OrdersModule;
