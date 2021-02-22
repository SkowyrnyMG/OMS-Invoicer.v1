import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import ConfigForm from 'components/modules/config-form/config-form';

import {
  addUserConfig,
  selectUserConfig,
  getUserConfig,
} from 'store/slices/db-slice/db-slice';

const SearchModule = () => {
  const dispatch = useDispatch();
  const userConfig = useSelector(selectUserConfig);
  const handleSubmit = async (cred) => {
    if (userConfig === null) {
      await dispatch(addUserConfig(cred));
    }
  };

  useEffect(() => {
    dispatch(getUserConfig());
  }, [dispatch]);
  return (
    <AppBodyContainer>
      {userConfig !== null && <ConfigForm onSubmit={handleSubmit} />}
    </AppBodyContainer>
  );
};

export default SearchModule;
