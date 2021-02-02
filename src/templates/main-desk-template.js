import React from 'react';
import { useSelector } from 'react-redux';

import QuickNavigation from 'components/organisms/main-desk/quick-navigation/quick-navigation';
import SummaryContainer from 'components/organisms/main-desk/summary-container/summary-container';

import { selectUserConfig } from 'store/slices/db-slice/db-slice';

const MainDeskTemplate = () => {
  const config = useSelector(selectUserConfig);
  return (
    <div>
      <QuickNavigation />
      {config !== null && <SummaryContainer />}
    </div>
  );
};

export default MainDeskTemplate;
