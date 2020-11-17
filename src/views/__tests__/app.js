import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../app';

describe('App', () => {
  test('should render into document', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const appContainer = container.firstChild;

    expect(appContainer).toBeInTheDocument();
  });
});
