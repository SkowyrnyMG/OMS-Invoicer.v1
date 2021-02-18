import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PDFViewer } from '@react-pdf/renderer';

import { ReactComponent as WindowResizeIcon } from 'assets/svg/window-resize-icon.svg';
import { ReactComponent as WindowCloseIcon } from 'assets/svg/window-close-icon.svg';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${({ theme: { color } }) => color.transparentDark};
  backdrop-filter: blur(2px);
  z-index: 10000;
`;

const InvoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '70%')};
  height: ${({ isFullWidth }) => (isFullWidth ? '100vh' : '80vh')};
  background: ${({ theme: { color } }) => color.bg};
  border-radius: 0.5rem;

  transition: all 0.25s;

  // * @react-pdf/renderer renders in iframe
  iframe {
    height: 100%;
  }
`;

const ContainerTopBar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 4rem;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  overflow: hidden;

  background: ${({ theme: { color } }) => color.transparentMain};
`;

const TopBarButtonsWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: fit-content;
`;

const TopBarButton = styled.button`
  width: 4rem;
  height: 100%;
  background: ${({ close, theme: { color } }) =>
    close ? color.danger : color.transparentMain};
  border: 0;
  cursor: pointer;

  svg {
    /* position: absolute; */
    width: 1.5rem;
    fill: ${({ theme: { color } }) => color.bg};
  }
`;

const PDFContainer = ({ children, closeRenderer }) => {
  const [isFullWidth, setIsFullWidth] = useState(false);
  return (
    <Wrapper>
      <InvoiceContainer isFullWidth={isFullWidth}>
        <ContainerTopBar>
          <TopBarButtonsWrapper>
            <TopBarButton onClick={() => setIsFullWidth((state) => !state)}>
              <WindowResizeIcon />
            </TopBarButton>
            <TopBarButton onClick={closeRenderer} close>
              <WindowCloseIcon />
            </TopBarButton>
          </TopBarButtonsWrapper>
        </ContainerTopBar>
        <PDFViewer>{children}</PDFViewer>
      </InvoiceContainer>
    </Wrapper>
  );
};

PDFContainer.propTypes = {
  children: PropTypes.node.isRequired,
  closeRenderer: PropTypes.func.isRequired,
};

export default PDFContainer;
