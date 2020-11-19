import React from 'react';
import { renderWithRouter, fireEvent, leftClick } from 'utils/test-helper';
import Home from '../home';

describe('Home', () => {
  test('should render into document', () => {
    const { container } = renderWithRouter(<Home />);
    const appContainer = container.firstChild;

    expect(appContainer).toBeInTheDocument();
  });

  test('should redirect to register page after click on CTA link', () => {
    const { getByText, history } = renderWithRouter(<Home />);
    const registerPath = '/register';

    const initialPath = history.location.pathname;
    const CtaLink = getByText(/TRY FOR FREE AND SEND ME SOME FEEDBACK/i);
    fireEvent.click(CtaLink, leftClick);
    const redirectPath = history.location.pathname;

    expect(initialPath).toBe('/');
    expect(initialPath).not.toBe(redirectPath);
    expect(redirectPath).toBe(registerPath);
  });
});
