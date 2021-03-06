import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import AppGridContainer from 'components/atoms/app-grid-container/app-grid-container';
import AppTableBody from 'components/modules/app-table-body/app-table-body';
import CustomerCotrolModal from 'components/organisms/customer-control-modal/customer-control-modal';
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
    [customersList],
  );
  const defaultColumnValues = useDefaultColumn(columns.length);
  const defaultColumn = useMemo(() => defaultColumnValues, [
    defaultColumnValues,
  ]);

  const handleDeleteClick = (cred) => {
    dispatch(deleteCustomer(cred));
  };

  const handleAddNewClick = () => {
    setCurrentCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <AppGridContainer>
      {isModalOpen && (
        <CustomerCotrolModal
          currentCustomer={currentCustomer}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <AppTableBody
        setCurrentPosValues={setCurrentCustomer}
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        isModalOpen={isModalOpen}
      />
      <ActionMenu>
        <Button onClick={handleAddNewClick}>Add new</Button>
        <Button onClick={handleEditClick} disabled={currentCustomer === null}>
          Edit
        </Button>
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

CustomersModule.defaultProps = {
  customersList: [],
};

CustomersModule.propTypes = {
  customersList: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      contactEmail: PropTypes.string.isRequired,
      contactPerson: PropTypes.string.isRequired,
      contactPhone: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      postCode: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      town: PropTypes.string.isRequired,
      vat_number: PropTypes.string.isRequired,
    }),
  ),
};
export default CustomersModule;
