import { routes } from 'utils/routes';
import { usePathname } from './usePathname';

export const useModuleName = () => {
  const currentPath = usePathname();

  if (!currentPath.includes('app')) return '';
  if (currentPath === routes.app) return 'main desk';
  return currentPath.substr(5, 20).toLowerCase();
};
