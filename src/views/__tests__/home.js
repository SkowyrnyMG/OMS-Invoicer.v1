import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Home from '../home';

describe('Home', () => {
  test('should render into document', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const appContainer = container.firstChild;

    expect(appContainer).toBeInTheDocument();
  });
});
