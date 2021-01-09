export const CUSTOMERS_COLUMNS = [
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'VAT-NUMBER',
    accessor: 'vat_number',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
];

export const ORDERS_COLUMNS = [
  {
    Header: 'ORDER NR',
    accessor: 'order_number',
  },
  {
    Header: 'PRICE',
    accessor: 'price',
  },
  {
    Header: 'CURRENCY',
    accessor: 'currency',
  },
  {
    Header: 'STATUS',
    accessor: 'status',
  },
  {
    Header: 'DESCRIPTION',
    accessor: 'desc',
  },
  {
    Header: 'CUSTOMER NAME',
    accessor: 'customer_name',
  },
  {
    Header: 'CUSTOMER VAT',
    accessor: 'customer_vat',
  },
  {
    Header: 'CUSTOMER_ADDRESS',
    accessor: 'customer_address',
  },
  {
    Header: 'EMAIL OF CONTACT PERSON',
    accessor: 'email',
  },
];

export const INVOICES_COLUMNS = [
  {
    Header: 'INVOICE NUMBER',
    accessor: 'invoice_number',
  },
  {
    Header: 'ORDER NUMBER',
    accessor: 'order_number',
  },
  {
    Header: 'PRICE',
    accessor: 'price',
  },
];

export const PAYMENTS_COLUMNS = [
  {
    Header: 'INVOICE NR',
    accessor: 'invoice_number',
  },
  {
    Header: 'COMPANY NAME',
    accessor: 'company_name',
  },
  {
    Header: 'PRICE',
    accessor: 'price',
  },
  {
    Header: 'PAID',
    accessor: 'paid_amount',
  },
  {
    Header: 'LEFT TO PAY',
    accessor: 'left_to_pay',
  },
  {
    Header: 'LAST ACTION',
    accessor: 'latest_action',
  },
];
