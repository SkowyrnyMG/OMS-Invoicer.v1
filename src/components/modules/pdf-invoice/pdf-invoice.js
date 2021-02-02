import React from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import { customFonts } from 'themes/theme';
import { roundTwoDecimals, addDaysToDate } from 'utils/math-helper';
import { STATUS_OPTION } from 'utils/constant-data';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: customFonts.roboto.thin,
      fontStyle: 'normal',
      fontWeight: 'thin',
    },
    {
      src: customFonts.roboto.regular,
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
    {
      src: customFonts.roboto.bold,
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  document: {
    height: '100%',
  },
  page: {
    position: 'relative',
    display: 'flex',
    padding: '15pt 10pt',
    flexDirection: 'column',
    fontFamily: 'Roboto',
    lineHeight: 1.5,
    backgroundColor: '#fff',
  },
  crossInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    fontSize: '100pt',
    fontWeight: 'bold',
    letterSpacing: '40pt',

    top: '50%',
    // left: '35%',
    // transform: 'translate(-50%, -50%) rotate(-55deg)',
    transform: 'translateY(-50%) rotate(-55deg)',
    opacity: 0.5,
  },
  crossInfoCancelled: {
    color: '#F25C54',
  },
  crossInfoPaid: {
    color: '#C8D3FD',
  },
  smallText: {
    fontSize: '12pt',
  },
  mediumText: {
    fontSize: '20pt',
  },
  bigText: {
    fontSize: '30pt',
  },
  topBar: {
    margin: '10pt',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '10pt',
  },
  headerWrapper: {
    display: 'block',
    textAlign: 'center',
    height: '20%',
    width: '100%',
  },
  title: {
    marginTop: '50pt',
    fontSize: '50pt',
    fontWeight: 'bold',
  },
  twoColumnsFlex: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10pt',
    fontSize: '9pt',
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  devider: {
    display: 'flex',
    flexDirection: 'row',
    padding: '2pt 10pt',
    margin: '0 10pt',
    fontSize: '9pt',
    backgroundColor: '#efefee',
    borderTop: '2pt solid #efefee',
    borderBottom: '2pt solid #bfbfbf',
  },
  devideEnd: {
    display: 'flex',
    padding: '0 10pt',
    margin: '0 10pt',
    backgroundColor: '#efefee',
    borderBottom: '2pt solid #bfbfbf',
  },
  deviderPart: {
    flexBasis: '50%',
  },
  deviderPartBig: {
    flexBasis: '50%',
    fontSize: '12pt',
    fontWeight: 'bold',
  },
  flexHalfContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 10pt',
    margin: '0 10pt',
    fontSize: '9pt',
  },
  flexHalf: {
    flexBasis: '50%',
    padding: '0 30pt 0  0',
    borderLeft: '1pt solid #efefee',
  },
  whiteSpace: {
    margin: '50pt 0',
  },
});

const PDFInvoice = ({ currentInvoice, rootCompanyDetails, bankDetails }) => {
  return (
    <Document style={styles.document}>
      <Page size='A4' style={styles.page}>
        <View style={styles.topBar}>
          <Text>OMS Invoicer.v1</Text>
        </View>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.smallText}>original/copy</Text>
        </View>
        <View style={styles.twoColumnsFlex}>
          <View style={styles.detailRow}>
            <Text>{rootCompanyDetails.rootCompanyName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>{`${rootCompanyDetails.rootStreet}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>{`${rootCompanyDetails.rootPostCode}, ${rootCompanyDetails.rootTown}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>{rootCompanyDetails.rootCountry}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>{rootCompanyDetails.rootVat}</Text>
          </View>
        </View>
        <View style={styles.devider}>
          <Text style={styles.deviderPart}>Invoice details:</Text>
          <Text style={styles.deviderPart}>Bill to:</Text>
        </View>
        <View style={styles.flexHalfContainer}>
          <View style={styles.flexHalf}>
            <View style={styles.twoColumnsFlex}>
              <View style={styles.detailRow}>
                <Text>Invoice number: </Text>
                <Text>{currentInvoice.invoice_number}</Text>
              </View>
              {/* <View style={styles.detailRow}>
                <Text>Order number:</Text>
                <Text>{`${currentInvoice.order_number}`}</Text>
              </View> */}
              <View style={styles.detailRow}>
                <Text>Issue date:</Text>
                <Text>{currentInvoice.issue_date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text>Sale date:</Text>
                <Text>{currentInvoice.sale_date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.flexHalf}>
            <View style={styles.twoColumnsFlex}>
              <View style={styles.detailRow}>
                <Text>{currentInvoice.customer_name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text>{currentInvoice.customer_address}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text>{currentInvoice.customer_vat}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.devider}>
          <Text style={styles.deviderPart}>Positoin:</Text>
          <Text style={styles.deviderPart}>Description:</Text>
        </View>
        <View style={styles.flexHalfContainer}>
          <View style={styles.flexHalf}>
            <View style={styles.twoColumnsFlex}>
              <View style={styles.detailRow}>
                <Text>Order number:</Text>
                <Text>{`${currentInvoice.order_number}`}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text>Price net: </Text>
                <Text>{`${currentInvoice.price_net} ${currentInvoice.currency}`}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text>Vat value:</Text>
                <Text>{`${currentInvoice.tax}%`}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text>Vat price:</Text>
                <Text>
                  {`${roundTwoDecimals(
                    currentInvoice.price_gross - currentInvoice.price_net,
                  )} ${currentInvoice.currency}`}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text>Price gross:</Text>
                <Text>
                  {`${currentInvoice.price_gross} ${currentInvoice.currency}`}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.flexHalf}>
            <View style={styles.twoColumnsFlex}>
              <View style={styles.detailRow}>
                <Text>{currentInvoice.desc}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.devideEnd} />
        <View style={styles.whiteSpace} />
        <View style={styles.flexHalfContainer}>
          <Text style={styles.smallText}>To pay: </Text>
          <Text style={styles.smallText}>
            {`Invoice due to: ${addDaysToDate(
              currentInvoice.issue_date,
              currentInvoice.terms,
            )}`}
          </Text>
        </View>
        <View style={styles.devider}>
          <Text style={styles.deviderPartBig}>
            {`Gross: ${currentInvoice.price_gross} ${currentInvoice.currency}`}
          </Text>
        </View>
        <View style={styles.flexHalfContainer}>
          <Text>
            {`Bank account: ${bankDetails.iban}${bankDetails.bankAccountNumber} - ${bankDetails.bankName}`}
          </Text>
          <Text>{`SWIFT: ${bankDetails.swift}`}</Text>
        </View>
        <Text>&nbsp;</Text>
        {currentInvoice.payment_value !== currentInvoice.price_gross &&
          currentInvoice.payment_status !== STATUS_OPTION.invoice.paid && (
            <>
              <View style={styles.flexHalfContainer}>
                <Text style={styles.smallText}>
                  {`Already paid: ${roundTwoDecimals(
                    currentInvoice.payment_value,
                  )} ${currentInvoice.currency}`}
                </Text>
                <Text style={styles.smallText}>
                  {`Left to pay: ${roundTwoDecimals(
                    currentInvoice.price_gross - currentInvoice.payment_value,
                  )} ${currentInvoice.currency}`}
                </Text>
              </View>
            </>
          )}
        {/* // * STATUS components have to be always at the end of the file,
        // * otherwise they won't be on top */}
        {currentInvoice.payment_status === STATUS_OPTION.invoice.paid && (
          <View style={styles.crossInfo}>
            <Text style={styles.crossInfoPaid}>PAID</Text>
          </View>
        )}
        {currentInvoice.payment_status === STATUS_OPTION.invoice.cancelled && (
          <View style={styles.crossInfo}>
            <Text style={styles.crossInfoCancelled}>STORNO</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

PDFInvoice.propTypes = {
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
  }).isRequired,
};

export default PDFInvoice;
