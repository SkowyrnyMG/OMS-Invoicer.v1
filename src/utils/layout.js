import React, { useEffect } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import GlobalStyles from 'themes/global-styles';
import { theme } from 'themes/theme';

import Loader from 'components/modules/loader/loader';
import TopBar from 'components/modules/top-bar/top-bar';
import AppNavigation from 'components/modules/app-navigation/app-navigation';
import FirstConfigModal from 'components/organisms/first-config-modal/first-config-modal';

import { useIsLoading } from 'hooks/useIsLoading';
import { usePathname } from 'hooks/usePathname';
import {
  getUserConfig,
  selectUserConfig,
} from 'store/slices/db-slice/db-slice';

const Wrapper = styled.div`
  display: grid;
  ${({ pathname }) =>
    pathname.includes('/app')
      ? css`
          grid-template-columns:
            [app-nav-start] 15%
            [app-nav-end top-bar-start content-start]
            repeat(10, 1fr) [content-end top-bar-end];

          > * {
            grid-column: content-start / content-end;
          }
        `
      : css`
          grid-template-columns: [top-bar-start] 1fr [content-start] 6fr [content-end] 1fr [top-bar-end];

          > * {
            grid-column: 1 / -1;
          }
        `};
`;

const Main = styled.main`
  position: relative;
  padding: ${({ pathname }) =>
    pathname.includes('/app') ? '4.5rem 7.5rem' : 0};
  background-color: ${({ theme: { color } }) => color.bg};
  min-height: calc(90vh - 6rem);
`;

const Layout = ({ children }) => {
  const config = useSelector(selectUserConfig);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserConfig());
  }, [dispatch]);
  const isLoading = useIsLoading();
  const pathname = usePathname();
  console.log(config);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Wrapper pathname={pathname}>
        <FirstConfigModal />
        {isLoading && <Loader />}
        <TopBar />
        {pathname.includes('/app') && <AppNavigation />}
        <Main pathname={pathname}>{children}</Main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
