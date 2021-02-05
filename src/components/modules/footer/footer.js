import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: fit-content;
  background: ${({ theme: { color } }) => color.transparentMain};
`;

const Footer = () => (
  <StyledFooter>
    <a href='https://mateuszgruzla.pl/' rel='norefferer'>
      App created by Mateusz Gruźla
    </a>
  </StyledFooter>
);

export default Footer;
