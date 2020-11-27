import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getUserData, logoutUser } from 'store/slices/auth-slice/auth-slice';

import NavLink from 'components/atoms/nav-link/nav-link';
import UserInfo from 'components/modules/user-info/user-info';
import { ReactComponent as LogoutIcon } from 'assets/svg/logout-icon.svg';

import { routes } from 'utils/routes';

const Wrapper = styled.header`
  grid-column: top-bar-start / top-bar-end !important;
  display: grid;
  grid-template-columns: [logo-start] 24rem [logo-end middle-bar-start] 1fr [middle-bar-end nav-start] 27rem [nav-end];
  justify-items: center;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  height: 6rem;
  border-bottom: 1px solid ${({ theme: { color } }) => color.devider};
  box-shadow: ${({ theme: { shadow } }) => shadow.bottom};
  z-index: 50;
`;

const Logo = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.cta};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;
const StyledLoginNav = styled.nav`
  grid-column: nav-start / nav-end;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    padding: 1rem 2rem;
    border-left: 1px solid ${({ theme: { color } }) => color.devider};
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.regular};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  color: ${({ theme: { color } }) => color.danger};
  background: none;
  border: none;
  border-left: 1px solid ${({ theme: { color } }) => color.devider};
  cursor: pointer;
  transition: 0.25s transform;

  *:not(:last-child) {
    margin-right: 1rem;
  }
  :hover {
    transform: translateX(5px);
  }
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  fill: ${({ theme: { color } }) => color.danger};
`;

const TopBar = () => {
  const {
    uuid,
    userInfo: { email },
  } = useSelector(getUserData);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logoutUser());
  };
  return (
    <Wrapper>
      <NavLink path={routes.home}>
        <Logo>OMS Invoicer.v1</Logo>
      </NavLink>
      <StyledLoginNav>
        {uuid === '' || uuid === null ? (
          <>
            <NavLink linktype='login' path={routes.login}>
              Sign in
            </NavLink>
            <NavLink linktype='logout' path={routes.register}>
              Sign up
            </NavLink>
          </>
        ) : (
          <>
            <UserInfo>{email}</UserInfo>
            <LogoutBtn onClick={handleClick}>
              <span>Logout</span>
              <StyledLogoutIcon />
            </LogoutBtn>
          </>
        )}
      </StyledLoginNav>
    </Wrapper>
  );
};

export default TopBar;
