import React from 'react';
import { renderWithReduxRouter } from 'utils/test-helper';
import App from '../app/app';

describe('App', () => {
  test('should render into document', () => {
    const { container } = renderWithReduxRouter(<App />);
    const appContainer = container.firstChild;

    expect(appContainer).toBeInTheDocument();
  });
});
