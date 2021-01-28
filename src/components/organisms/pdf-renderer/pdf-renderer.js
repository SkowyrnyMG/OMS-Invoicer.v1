import React from 'react';
// import styled from 'styled-components';

import PDFContainer from 'components/modules/pdf-container/pdf-container';
import PDFInvoice from 'components/modules/pdf-invoice/pdf-invoice';

const PDFRenderer = ({ closeRenderer }) => {
  return (
    <PDFContainer closeRenderer={closeRenderer}>
      <PDFInvoice />
    </PDFContainer>
  );
};

export default PDFRenderer;
