import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import ConfigForm from 'components/modules/config-form/config-form';
import HeadingBlue from 'components/atoms/heading-blue/heading-blue';

import { usePathname } from 'hooks/usePathname';
import {
  selectUserConfig,
  getUserConfig,
  addUserConfig,
} from 'store/slices/db-slice/db-slice';
import { selectLoading } from 'store/slices/loading-slice/loading-slice';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${({ theme: { color } }) => color.transparentMain};
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
  z-index: 10000;
`;

const StyledAppBodyContainer = styled(AppBodyContainer)`
  padding: 5rem;
  height: 80%;
  border: 1px solid ${({ theme: { color } }) => color.primary};
  border-radius: 5px;
  overflow: auto;
`;

const StyledHeadingBlue = styled(HeadingBlue)`
  margin: 3rem 0;
  font-size: ${({ theme: { fontSize } }) => fontSize.cta};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  text-align: center;
`;

const FirstConfigModal = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const userConfig = useSelector(selectUserConfig);
  const isLoading = useSelector(selectLoading);
  const animationWrapper = useRef(null);
  const isVisibleCondition =
    (userConfig === null && pathname.includes('/app') && !isLoading) ?? false;

  useEffect(() => {
    dispatch(getUserConfig());

    if (isVisibleCondition) {
      const animationContainer = animationWrapper.current;
      gsap.set(animationContainer, { autoAlpha: 0 });
      gsap.to(animationContainer, {
        duration: 0.5,
        delay: 1,
        autoAlpha: 1,
        backdropFilter: 'blur(2px)',
      });
    }
  }, [dispatch, isVisibleCondition]);

  const handleSubmit = async (cred) => {
    await dispatch(addUserConfig(cred));
  };

  return (
    <>
      {isVisibleCondition ? (
        <Wrapper ref={animationWrapper}>
          <StyledAppBodyContainer>
            <StyledHeadingBlue>Welcolme into OMS Invoicer!</StyledHeadingBlue>
            <div>
              <p>Thank you for registration!</p>
              <p>
                There is only one thing left to do to start use the aplication.
                Please provide basic order and invoice registry config. The app
                will use those to provide automatic numeration for all of your
                positions.
              </p>
            </div>
            <ConfigForm onSubmit={handleSubmit} />
          </StyledAppBodyContainer>
        </Wrapper>
      ) : null}
    </>
  );
};

export default FirstConfigModal;
