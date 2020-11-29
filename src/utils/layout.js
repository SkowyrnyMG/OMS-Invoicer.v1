import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';

import GlobalStyles from 'themes/global-styles';
import { theme } from 'themes/theme';

import Loader from 'components/modules/loader/loader';
import TopBar from 'components/modules/top-bar/top-bar';
import AppNavigation from 'components/modules/app-navigation/app-navigation';

import { useIsLoading } from 'hooks/useIsLoading';
import { usePathname } from 'hooks/usePathname';

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
  background-color: ${({ theme: { color } }) => color.bg};
`;

const Layout = ({ children }) => {
  const isLoading = useIsLoading();
  const pathname = usePathname();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Wrapper pathname={pathname}>
        {isLoading && <Loader />}
        <TopBar />
        {pathname.includes('/app') && <AppNavigation />}
        <Main>{children}</Main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
