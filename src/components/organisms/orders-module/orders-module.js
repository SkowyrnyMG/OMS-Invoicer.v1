import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import OrderControlModal from 'components/organisms/order-control-modal/order-control-modal';
import ActionMenu from 'components/modules/action-menu/action-menu';
import Button from 'components/atoms/button/button';

import { ORDERS_COLUMNS } from 'utils/table-columns';
import { useDefaultColumn } from 'hooks/useDefaultColumn';
import { cancelOrder, getAllOrders } from 'store/slices/db-slice/db-slice';

const OrdersModule = ({ ordersList }) => {
  const dispatch = useDispatch();
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

  const handleDeleteClick = async () => {
    const orderNumber = currentOrder.order_number;
    await dispatch(cancelOrder(orderNumber));
    dispatch(getAllOrders());
  };

  // TODO optionaly add possibility to edit order status by using button from quick menu
  const handleAddNewClick = () => {
    setCurrentOrder(null);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <AppGridContainer>
      {isModalOpen && (
        <OrderControlModal
          closeModal={() => setIsModalOpen(false)}
          currentOrder={currentOrder}
        />
      )}
      <AppTableBody
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        setCurrentPosValues={setCurrentOrder}
      />
      <ActionMenu>
        <Button onClick={handleAddNewClick}>Add new</Button>
        <Button onClick={handleEditClick}>Edit</Button>
        <Button
          disabled={
            currentOrder === null || !currentOrder.status.match(/finished/i)
          }
        >
          Issue invoice
        </Button>
        <Button
          disabled={
            currentOrder === null || currentOrder.status.match(/cancelled/i)
          }
          onClick={handleDeleteClick}
        >
          Cancel
        </Button>
      </ActionMenu>
    </AppGridContainer>
  );
};

export default OrdersModule;
