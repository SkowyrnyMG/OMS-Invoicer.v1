import { useSelector } from 'react-redux';

import { selectLoading } from 'store/slices/loading-slice/loading-slice';

const useIsLoading = () => {
  return useSelector(selectLoading);
};

export { useIsLoading };
