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
];
