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

* {
  ::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  background-color: ${({ theme: { color } }) => color.transparentMain};
}
}

input {
      padding: 0.5rem;
      width: 100%;
      height: 3rem;
      font-size: ${({ theme: { fontSize } }) => fontSize.ms};
      color: ${({ theme: { color } }) => color.secondaryFont};
      outline: none;
      border: 1px solid currentColor;
      border-radius: 5px;
}

select {
  cursor: pointer;
}

input, select  {
  :disabled {
      background: ${({ theme: { color } }) => color.transparentDark};
      color: ${({ theme: { color } }) => color.mainFont};
      font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
      opacity: 0.4;
      cursor: not-allowed;

      ::placeholder {
        color: currentCOlor;
      }
    }
}
`;

export default GlobalStyles;
