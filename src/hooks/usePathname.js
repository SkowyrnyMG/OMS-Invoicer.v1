import { useLocation } from 'react-router-dom';

export const usePathname = () => {
  const currentLocation = useLocation();
  return currentLocation.pathname;
};
