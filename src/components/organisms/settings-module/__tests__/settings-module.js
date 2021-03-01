import React from 'react';

import { renderWithReduxRouter, screen } from 'utils/tests/test-helper';
import SettingsModule from '../settings-module';

describe('SettingsModule', () => {
  test('should display in the document with correct styles', async () => {
    renderWithReduxRouter(<SettingsModule />);

    const settingsFormNode = await screen.findByRole('heading', {
      name: 'Registry options',
    });

    expect(settingsFormNode).toBeInTheDocument();
  });
});
