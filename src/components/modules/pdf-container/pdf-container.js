import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PDFViewer } from '@react-pdf/renderer';

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
  width: 70%;
  height: 80vh;
  background: ${({ theme: { color } }) => color.bg};
  border-radius: 0.5rem;

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

const CloseButton = styled.button`
  position: absolute;
  height: 100%;
  width: 4rem;
  right: 0;
  top: 0;
  background: ${({ theme: { color } }) => color.danger};
  border: 0;
  cursor: pointer;
`;

const PDFContainer = ({ children, closeRenderer }) => {
  return (
    <Wrapper>
      <InvoiceContainer>
        <ContainerTopBar>
          <CloseButton onClick={closeRenderer}>X</CloseButton>
        </ContainerTopBar>
        <PDFViewer>{children}</PDFViewer>
      </InvoiceContainer>
    </Wrapper>
  );
};

PDFContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PDFContainer;
