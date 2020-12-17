import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'hooks/usePathname';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import ConfigForm from 'components/modules/config-form/config-form';
import HeadingBlue from 'components/atoms/heading-blue/heading-blue';

import {
  selectUserConfig,
  getUserConfig,
  addUserConfig,
} from 'store/slices/db-slice/db-slice';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${({ theme: { color } }) => color.transparentMain};
  z-index: 10000;
`;

const StyledAppBodyContainer = styled(AppBodyContainer)`
  padding: 5rem;
  overflow: auto;
`;

const StyledHeadingBlue = styled(HeadingBlue)`
  margin: 3rem 0;
  font-size: ${({ theme: { fontSize } }) => fontSize.cta};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  text-align: center;
`;

// const InfoBox = styled.div``;

const FirstConfigModal = () => {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const userConfig = useSelector(selectUserConfig);

  console.log(userConfig);
  useEffect(() => {
    dispatch(getUserConfig());
  }, [dispatch]);

  const handleSubmit = async (cred) => {
    await dispatch(addUserConfig(cred));
    await dispatch(getUserConfig());
  };

  return (
    <>
      {userConfig === null && pathname.includes('/app') ? (
        <Wrapper>
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
            {/* {userConfig.mainOrderPrefix} */}
          </StyledAppBodyContainer>
        </Wrapper>
      ) : null}
    </>
  );
};

export default FirstConfigModal;
