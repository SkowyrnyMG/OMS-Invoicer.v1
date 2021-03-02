import React from 'react';

import {
  snapShotTest,
  renderWithReduxRouter,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import FAQPosition from '../faq-position';

describe('FAQPosition', () => {
  test('should display in the document with correct styles', () => {
    snapShotTest(
      <FAQPosition title='TestFAQ title'>TestFAQ description.</FAQPosition>,
    );
  });

  test('should open and close position description on heading click', () => {
    renderWithReduxRouter(
      <FAQPosition title='TestFAQ title'>TestFAQ description.</FAQPosition>,
    );
    let description = screen.queryByText('TestFAQ description.');
    const heading = screen.getByRole('heading', { name: /TestFAQ title/i });

    expect(description).toBeNull();

    userEvent.click(heading);

    description = screen.queryByText('TestFAQ description.');

    expect(description).toBeInTheDocument();
  });
});
