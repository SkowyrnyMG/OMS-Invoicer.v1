import React from 'react';

import { renderWithReduxRouter, screen } from 'utils/tests/test-helper';
import { getLocalValue } from 'hooks/useLocalStorage';
import FirstConfigModal from '../first-config-modal';

describe('FirstConfigModal', () => {
  test('should display in the document with correct styles', async () => {
    renderWithReduxRouter(<FirstConfigModal />, {}, { route: '/app' });

    console.log(getLocalValue('uuid'));
    const FirstConfigModalNode = await screen.findByTestId(
      'first-config-modal',
    );

    expect(FirstConfigModalNode).toBeInTheDocument();
    expect(FirstConfigModalNode).toMatchSnapshot();
  });

  // TODO TEST edgecases after animation
});
