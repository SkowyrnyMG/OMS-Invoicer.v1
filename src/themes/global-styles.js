import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
}

`;

export default GlobalStyles;
