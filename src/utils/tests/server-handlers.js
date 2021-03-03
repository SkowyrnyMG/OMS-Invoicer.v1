import { rest } from 'msw';

export const handlers = [
  rest.get('/api/verify', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          address: 'TEST STREET 25A, 00-000 TOWN',
          countryCode: 'PL',
          name: 'TEST COMPANY NAME',
          requestDate: '2021-02-23+01:00',
          valid: true,
          vatNumber: '8822119889',
        },
      }),
    );
  }),

  rest.post('/api/sendEmail', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: 'Message send!' }));
  }),

  rest.delete(`data/test-uuid/customers/2222222222.json`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ vat_number: '2222222222' }));
  }),
  rest.get(
    'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/config.json',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          bankDetails: {
            bankAccountNumber: '1256161635168362',
            bankName: 'SANTANDER',
            iban: 'PL',
            swift: 'SANTCEST',
          },
          mainInvoicePrefix: 'INV',
          mainOrderPrefix: 'ORD',
          rootCompanyDetails: {
            rootCompanyName: 'GLOBGRANIT LOGISTIC SPÓŁKA AKCYJNA',
            rootCountry: 'Polska',
            rootPostCode: 'PL58200',
            rootStreet: 'Ul. Jana Kilińskiego 47a',
            rootTown: 'DZIERŻONIÓW',
            rootVat: 'PL8822119889',
          },
        }),
      );
    },
  ),

  rest.get(
    'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/orders.json',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          firstReg: {
            TESTORD: {
              currency: 'EUR',
              customer_address: 'STREET 11, 00-000, TWON, PL,',
              customer_name: 'TEST COMPANY NAME',
              customer_vat: '2222222222',
              desc: 'fsdafsad',
              email: '',
              finish_date: new Date(2021, 1, 30),
              order_number: 'TESTORD',
              price: 555,
              status: 'finished',
              tax: 23,
            },
          },
          lastOrder: '',
        }),
      );
    },
  ),

  rest.get(
    'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/invoices.json',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          firstReg: {
            TESTINV: {
              currency: 'EUR',
              customer_address: 'TEST STREET, 00-000, TOWN, PL,',
              customer_name: 'TEST COMPANYNAME',
              customer_vat: 'PL2222222222',
              desc: 'This is test description',
              invoice_number: 'TESTINV',
              issue_date: '2021-02-03',
              left_to_pay: 0,
              order_number: 'TESTORD',
              payment_status: 'unpaid',
              payment_value: 0,
              price_gross: 615,
              price_net: 500,
              sale_date: '2021-02-04',
              tax: 23,
              terms: 7,
            },
          },
        }),
      );
    },
  ),

  rest.get(
    'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/customers.json',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          1111111111: {
            address: 'TEST ADDRES 1',
            vat_number: '1111111111',
            name: 'TEST NAME 1',
            country: 'PL',
            postCode: '00-000',
            street: 'Test street 1',
            town: 'town1',
            contactEmail: 'test@mail1.pl',
            contactPerson: 'Test Contact 1',
            contactPhone: 'Test phone 1',
            tax: 23,
          },
          2222222222: {
            address: 'TEST ADDRES 2',
            name: 'TEST NAME 2',
            vat_number: '2222222222',
            country: 'PL',
            town: 'town2',
            street: 'Test street 2',
            postCode: '00-000',
            contactEmail: 'test@mail2.pl',
            contactPerson: 'Test Contact 2',
            contactPhone: 'Test phone 2',
            tax: 23,
          },
        }),
      );
    },
  ),
];
