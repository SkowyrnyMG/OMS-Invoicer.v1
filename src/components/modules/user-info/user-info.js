import React from 'react';
import styled from 'styled-components';

import { ReactComponent as UserIcon } from 'assets/svg/user-icon.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledSpan = styled.span`
  width: fit-content;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  color: ${({ theme: { color } }) => color.primary};
`;

const StyledIcon = styled(UserIcon)`
  height: 1.4rem;
  fill: ${({ theme: { color } }) => color.primary};
`;

const UserInfo = ({ children }) => (
  <Wrapper>
    <StyledIcon />
    <StyledSpan>{children}</StyledSpan>
  </Wrapper>
);

export default UserInfo;
