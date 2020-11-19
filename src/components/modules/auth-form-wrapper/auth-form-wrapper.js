import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { routes } from 'utils/routes';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 6rem);
`;

const FormBox = styled.div`
  margin-bottom: 5rem;
  padding: 3rem 5rem;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  border-radius: 5px;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
`;

const StyledLink = styled(Link)`
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  color: ${({ theme: { color } }) => color.mainFont};
`;

const AuthFormWrapper = ({ children }) => (
  <Wrapper>
    <FormBox>{children}</FormBox>
    <StyledLink to={routes.home}>Take me from here!</StyledLink>
  </Wrapper>
);

export default AuthFormWrapper;
