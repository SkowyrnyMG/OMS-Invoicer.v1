import { format } from 'date-fns';

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
  // TODO make email column work with orders
  // {
  //   Header: 'EMAIL OF CONTACT PERSON',
  //   accessor: 'email',
  // },
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
    Header: 'PRICE NET',
    accessor: 'price_net',
  },
  {
    Header: 'PRICE GROSS',
    accessor: 'price_gross',
  },
  {
    Header: 'CURRENCY',
    accessor: 'currency',
  },
  {
    Header: 'LEFT TO PAY (in invoice currency)',
    accessor: 'left_to_pay',
  },
  {
    Header: 'STATUS',
    accessor: 'payment_status',
  },
  {
    Header: 'SALE DATE',
    accessor: 'sale_date',
    Cell: ({ value }) => {
      if (value !== undefined) {
        return format(new Date(value), 'dd.MM.yyyy');
      }
      return null;
    },
  },
  {
    Header: 'ISSUE DATE',
    accessor: 'issue_date',
    Cell: ({ value }) => {
      if (value !== undefined) {
        return format(new Date(value), 'dd.MM.yyyy');
      }
      return null;
    },
  },
  {
    Header: 'CUSTOMER NAME',
    accessor: 'customer_name',
  },
  {
    Header: 'CUSTOMER VAT',
    accessor: 'customer_vat',
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
