import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'themes/global-styles';
import { theme } from 'themes/theme';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <main>{children}</main>
  </ThemeProvider>
);

export default Layout;
