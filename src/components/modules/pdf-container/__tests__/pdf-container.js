// import React from 'react';

// import { renderWithReduxRouter } from 'utils/tests/test-helper';
// import PDFInvoice from 'components/modules/pdf-invoice/pdf-invoice';
// import PDFContainer from '../pdf-container';

// const testCurrentInvoice = {
//   currency: 'EUR',
//   customer_address: 'Test address',
//   customer_name: 'Test name',
//   customer_vat: 'Test vat',
//   desc: 'Test desc',
//   invoice_number: 'Test invoice number',
//   issue_date: 'Test issue date',
//   left_to_pay: 123,
//   order_number: 'Test order number',
//   payment_status: 'Test status',
//   payment_value: 0,
//   price_gross: 123,
//   price_net: 100,
//   sale_date: 'Test sale date',
//   tax: 23,
// };
// const testRootCompanyDetails = {};
// const testBankDetails = {};

// const handleTestClick = jest.fn();

// jest.mock('@react-pdf/renderer', () => ({
//   PDFViewer: function PDFViewer({ children }) {
//     return <>{children}</>;
//   },
//   Page: function Page({ children }) {
//     return <>{children({})}</>;
//   },
//   Text: function Text({ children }) {
//     return <>{children({})}</>;
//   },
//   Image: function Image({ children }) {
//     return <>{children({})}</>;
//   },
//   View: function View({ children }) {
//     return <>{children({})}</>;
//   },
//   Document: function Document({ children }) {
//     return <>{children({})}</>;
//   },
//   StyleSheet: {
//     create: () => ({
//       document: {
//         height: '100%',
//       },
//       page: {
//         position: 'relative',
//         display: 'flex',
//         padding: '15pt 10pt',
//         flexDirection: 'column',
//         fontFamily: 'Roboto',
//         lineHeight: 1.5,
//         backgroundColor: '#fff',
//       },
//       crossInfo: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         width: '100%',
//         fontSize: '100pt',
//         fontWeight: 'bold',
//         letterSpacing: '40pt',

//         top: '50%',
//         // left: '35%',
//         // transform: 'translate(-50%, -50%) rotate(-55deg)',
//         transform: 'translateY(-50%) rotate(-55deg)',
//         opacity: 0.5,
//       },
//       crossInfoCancelled: {
//         color: '#F25C54',
//       },
//       crossInfoPaid: {
//         color: '#C8D3FD',
//       },
//       smallText: {
//         fontSize: '12pt',
//       },
//       mediumText: {
//         fontSize: '20pt',
//       },
//       bigText: {
//         fontSize: '30pt',
//       },
//       topBar: {
//         margin: '10pt',
//         textAlign: 'left',
//         fontWeight: 'bold',
//         fontSize: '10pt',
//       },
//       logo: {
//         position: 'absolute',
//         width: '50pt',
//         height: '50pt',
//       },
//       headerWrapper: {
//         display: 'block',
//         textAlign: 'center',
//         height: '20%',
//         width: '100%',
//       },
//       title: {
//         marginTop: '50pt',
//         fontSize: '50pt',
//         fontWeight: 'bold',
//       },
//       twoColumnsFlex: {
//         display: 'flex',
//         flexDirection: 'column',
//         margin: '10pt',
//         fontSize: '9pt',
//       },
//       detailRow: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//       },
//       devider: {
//         display: 'flex',
//         flexDirection: 'row',
//         padding: '2pt 10pt',
//         margin: '0 10pt',
//         fontSize: '9pt',
//         backgroundColor: '#efefee',
//         borderTop: '2pt solid #efefee',
//         borderBottom: '2pt solid #bfbfbf',
//       },
//       devideEnd: {
//         display: 'flex',
//         padding: '0 10pt',
//         margin: '0 10pt',
//         backgroundColor: '#efefee',
//         borderBottom: '2pt solid #bfbfbf',
//       },
//       deviderPart: {
//         flexBasis: '50%',
//       },
//       deviderPartBig: {
//         flexBasis: '50%',
//         fontSize: '12pt',
//         fontWeight: 'bold',
//       },
//       flexHalfContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: '0 10pt',
//         margin: '0 10pt',
//         fontSize: '9pt',
//       },
//       flexHalf: {
//         flexBasis: '50%',
//         padding: '0 30pt 0  0',
//         borderLeft: '1pt solid #efefee',
//       },
//       whiteSpace: {
//         margin: '50pt 0',
//       },
//     }),
//   },
//   Font: {
//     register: jest.fn(),
//   },
// }));

describe('PDFContainer', () => {
  test('should display in the document with correct styles', () => {
    // renderWithReduxRouter(
    //   <PDFContainer closeRenderer={handleTestClick}>
    //     <PDFInvoice
    //       currentInvoice={testCurrentInvoice}
    //       rootCompanyDetails={testRootCompanyDetails}
    //       testBankDetails={testBankDetails}
    //     />
    //   </PDFContainer>,
    // );
    // TODO find a way to test this component.
  });
});
