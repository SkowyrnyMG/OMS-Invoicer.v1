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
  font-size: ${({ theme: { fontSize } }) => fontSize.regular};
  font-family: "Montserrat", sans-serif;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

h1,
h2,
h3 {
  line-height: 1.2;
}

h1 {
  font-size: ${({ theme: { fontSize } }) => fontSize.heading};
}

h2 {
  font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall}
}

h3 {
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
}

p {
  font-size: ${({ theme: { fontSize } }) => fontSize.regular}
}

a,
a:visited {
  text-decoration: none;
  color: ${({ theme: { color } }) => color.mainFont};
}


`;

export default GlobalStyles;
