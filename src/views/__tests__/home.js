import React from 'react';
import { renderWithReduxRouter, userEvent } from 'utils/tests/test-helper';
import Home from '../home';

describe('Home', () => {
  test('should render into document', () => {
    const { container } = renderWithReduxRouter(<Home />);
    const appContainer = container.firstChild;

    expect(appContainer).toBeInTheDocument();
  });

  test('should redirect to register page after click on CTA link', () => {
    const { getByText, history } = renderWithReduxRouter(<Home />);
    const registerPath = '/register';

    const initialPath = history.location.pathname;
    const CtaLink = getByText(/TRY FOR FREE AND SEND ME SOME FEEDBACK/i);
    userEvent.click(CtaLink);
    const redirectPath = history.location.pathname;

    expect(initialPath).toBe('/');
    expect(initialPath).not.toBe(redirectPath);
    expect(redirectPath).toBe(registerPath);
  });
});
