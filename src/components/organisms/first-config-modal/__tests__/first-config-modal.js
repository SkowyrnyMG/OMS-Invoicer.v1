import React from 'react';

import { rest } from 'msw';
import { server } from 'utils/tests/server';
import {
  renderWithReduxRouter,
  screen,
  waitFor,
  userEvent,
} from 'utils/tests/test-helper';
import FirstConfigModal from '../first-config-modal';

describe('FirstConfigModal', () => {
  test('should display in the document if there is no userConfig in db with correct styles', async () => {
    renderWithReduxRouter(<FirstConfigModal />, {}, { route: '/app' });

    server.use(
      rest.get(
        'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/config.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(null));
        },
      ),
    );

    const FirstConfigModalNode = await screen.findByTestId(
      'first-config-modal',
    );

    await waitFor(() => {
      expect(FirstConfigModalNode).toBeInTheDocument();
    });

    expect(FirstConfigModalNode).toBeInTheDocument();
    expect(FirstConfigModalNode).toMatchSnapshot();
  });

  test('should not dispaly in the doucment if user config is already in database', async () => {
    renderWithReduxRouter(<FirstConfigModal />, {}, { route: '/app' });
    const FirstConfigModalNode = await screen.findByTestId(
      'first-config-modal',
    );

    await waitFor(() => {
      expect(FirstConfigModalNode).toBeInTheDocument();
    });

    // * waits till component will be mounted, then it will check if userCongig is provided.
    // * in case of receiving config form db it will unmount the component

    expect(FirstConfigModalNode).not.toBeInTheDocument();
  });

  test('should not submit the form if required fields are empty', async () => {
    renderWithReduxRouter(<FirstConfigModal />, {}, { route: '/app' });

    server.use(
      rest.get(
        'https://oms-invoicer-v1.firebaseio.com/data/test-uuid/config.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(null));
        },
      ),
    );

    const FirstConfigModalNode = await screen.findByTestId(
      'first-config-modal',
    );

    await waitFor(() => {
      expect(FirstConfigModalNode).toBeInTheDocument();
    });

    const submitButtonNode = await screen.findByRole('button', {
      name: 'Save',
    });

    userEvent.click(submitButtonNode);

    expect(
      await screen.findByText(/bank name is required!/i),
    ).toBeInTheDocument();
  });
});
