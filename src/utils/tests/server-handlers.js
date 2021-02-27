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
              finish_date: '2021-02-24T23:00:00.000Z',
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
];

// currency: 'EUR',
// customer_address: 'SZCZECIŃSKA 11, PL54517, WROCŁAW, PL,',
// customer_name: 'BERGER BAU POLSKA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
// customer_vat: 'PL8981011638',
// desc: 'fsdafsad',
// email: '',
// finish_date: '2021-02-24T23:00:00.000Z',
// order_number: 'ORD-8-2021',
// price: 555,
// status: 'finished',
// tax: 23,
