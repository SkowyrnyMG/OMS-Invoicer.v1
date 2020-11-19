import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, css } from 'styled-components';

import GlobalStyles from 'themes/global-styles';
import { theme } from 'themes/theme';

import TopBar from 'components/modules/top-bar/top-bar';

const Wrapper = styled.div`
  display: grid;
  ${({ location }) =>
    location === 'app'
      ? css`
          grid-template-columns:
            repeat(2, 1fr) [top-bar-start content-start]
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

const Layout = ({ children, location }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Wrapper location={location}>
      <TopBar />
      <Main>{children}</Main>
    </Wrapper>
  </ThemeProvider>
);

Layout.defaultProps = {
  location: '',
};

Layout.propTypes = {
  location: PropTypes.string,
};

export default Layout;
