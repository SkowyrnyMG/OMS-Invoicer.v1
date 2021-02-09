import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getUserData } from 'store/slices/auth-slice/auth-slice';

import NavLink from 'components/atoms/nav-link/nav-link';
import UserInfo from 'components/modules/user-info/user-info';
// import { ReactComponent as LogoutIcon } from 'assets/svg/logout-icon.svg';
import Logo from 'components/modules/logo/logo';

import { routes } from 'utils/routes';
import { useModuleName } from 'hooks/useModuleName';

const Wrapper = styled.header`
  grid-column: top-bar-start / top-bar-end !important;
  display: grid;
  grid-template-columns: [logo-start] 24rem [logo-end middle-bar-start] 1fr [middle-bar-end nav-start] 0.25fr [nav-end];
  justify-items: center;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  min-height: 6rem;
  height: 10rem;
  background: ${({ theme: { color } }) => color.bg};
  border-bottom: 2px solid ${({ theme: { color } }) => color.devider};
  z-index: 50;

  ${({ theme: { mq } }) => mq.desktop} {
    grid-template-columns: repeat(2, 1fr);
    height: fit-content;
  }
  ${({ theme: { mq } }) => mq.desktop} {
    grid-template-columns: ${({ isNotAuthenticated }) =>
      !isNotAuthenticated ? '1fr' : 'repeat(2, 1fr)'};
    height: fit-content;
  }
`;

const CurrentModule = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.regular};
  font-style: italic;
  color: ${({ theme: { color } }) => color.primary};
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

  ${({ theme: { mq } }) => mq.smallTablet} {
    /* grid-column: 1 / -1; */
    flex-direction: column;

    > * {
      border: none;
    }
  }
`;

// const LogoutBtn = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 10rem;
//   font-size: inherit;
//   font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
//   color: ${({ theme: { color } }) => color.danger};
//   background: none;
//   border: none;
//   border-left: 1px solid ${({ theme: { color } }) => color.devider};
//   cursor: pointer;
//   transition: 0.25s transform;

//   *:not(:last-child) {
//     margin-right: 1rem;
//   }
//   :hover {
//     transform: translateX(5px);
//   }
// `;

// const StyledLogoutIcon = styled(LogoutIcon)`
//   fill: ${({ theme: { color } }) => color.danger};
// `;

const StyledUserInfo = styled(UserInfo)`
  opacity: 0 !important;
  ${({ theme: { mq } }) => mq.smallTablet} {
    * {
      display: none !important;
    }
  }
`;

const TopBar = () => {
  const {
    uuid,
    userInfo: { email },
  } = useSelector(getUserData);
  const [isNotAuthenticated] = useState(uuid === '' || uuid === null);
  const [isTabletWidth, setIsTabletWidth] = useState(true);
  // const dispatch = useDispatch();
  const currentModule = useModuleName();

  // const handleClick = () => {
  //   dispatch(logoutUser());
  // };

  useEffect(() => {
    const handleWindowResize = () => {
      setIsTabletWidth(window.outerWidth <= 1168);
    };
    handleWindowResize();
    window.onresize = handleWindowResize;
  }, []);

  return (
    <Wrapper isNotAuthenticated={isNotAuthenticated}>
      {currentModule !== '' ? (
        <CurrentModule>{currentModule}</CurrentModule>
      ) : (
        <Logo />
      )}
      <StyledLoginNav>
        {isNotAuthenticated ? (
          <>
            <NavLink linktype='login' path={routes.login}>
              Sign in
            </NavLink>
            <NavLink linktype='logout' path={routes.register}>
              Sign up
            </NavLink>
          </>
        ) : (
          !isTabletWidth && (
            <>
              <StyledUserInfo>{email}</StyledUserInfo>
              {/* <LogoutBtn onClick={handleClick}>
                <span>Logout</span>
                <StyledLogoutIcon />
              </LogoutBtn> */}
            </>
          )
        )}
      </StyledLoginNav>
    </Wrapper>
  );
};

export default TopBar;
