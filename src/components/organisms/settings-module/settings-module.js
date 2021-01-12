import React from 'react';
import { useDispatch } from 'react-redux';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import ConfigForm from 'components/modules/config-form/config-form';

import { addUserConfig } from 'store/slices/db-slice/db-slice';

const SearchModule = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (cred) => {
    await dispatch(addUserConfig(cred));
  };
  return (
    <AppBodyContainer>
      <ConfigForm onSubmit={handleSubmit} />
    </AppBodyContainer>
  );
};

export default SearchModule;
