import { rest } from 'msw';

export const handlers = [
  rest.get('/api/verify', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          contactEmail: 'test@email.com',
          contactPerson: 'test-person',
          contactPhone: 'tesxt-phone',
          country: 'test-country',
          name: 'test-name',
          postCode: 'test-postcode',
          street: 'test-street',
          tax: 'test-tax',
          town: 'test-town',
          vat_number: 'test-vat',
        },
      }),
    );
  }),
];
