import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectUserConfig } from 'store/slices/db-slice/db-slice';

import PDFContainer from 'components/modules/pdf-container/pdf-container';
import PDFInvoice from 'components/modules/pdf-invoice/pdf-invoice';

const PDFRenderer = ({ closeRenderer, currentInvoice }) => {
  const { rootCompanyDetails, bankDetails } = useSelector(selectUserConfig);
  return (
    <PDFContainer closeRenderer={closeRenderer}>
      <PDFInvoice
        currentInvoice={currentInvoice}
        rootCompanyDetails={rootCompanyDetails}
        bankDetails={bankDetails}
      />
    </PDFContainer>
  );
};

PDFRenderer.defaultProps = {
  currentInvoice: {},
};

PDFRenderer.propTypes = {
  closeRenderer: PropTypes.func.isRequired,
  currentInvoice: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    customer_address: PropTypes.string.isRequired,
    customer_name: PropTypes.string.isRequired,
    customer_vat: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    invoice_number: PropTypes.string.isRequired,
    issue_date: PropTypes.string.isRequired,
    left_to_pay: PropTypes.number.isRequired,
    order_number: PropTypes.string.isRequired,
    payment_status: PropTypes.string.isRequired,
    payment_value: PropTypes.number.isRequired,
    price_gross: PropTypes.number.isRequired,
    price_net: PropTypes.number.isRequired,
    sale_date: PropTypes.string.isRequired,
    tax: PropTypes.number.isRequired,
  }),
};

export default PDFRenderer;
