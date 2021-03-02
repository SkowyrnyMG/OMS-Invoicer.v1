import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  userEvent,
} from 'utils/tests/test-helper';
import HelpTooltip from '../help-tool-tip';

describe('HelpTooltip', () => {
  test('should display in the document with correct styles', () => {
    const { container } = renderWithReduxRouter(
      <HelpTooltip info='test-info-text' />,
    );

    const HelpTooltipNode = container.firstChild;

    expect(HelpTooltipNode).toBeInTheDocument();
    expect(HelpTooltipNode).toMatchSnapshot();
  });

  test('should open and close tooltip container on tooltip button click', () => {
    renderWithReduxRouter(<HelpTooltip info='test-info-text' />);

    const TooltipNode = screen.getByText('test-info-text');
    const TooltipButton = screen.getByRole('button', { name: '?' });

    expect(TooltipNode).toHaveStyle('opacity: 0');

    userEvent.click(TooltipButton);
    expect(TooltipNode).toHaveStyle('opacity: 1');

    userEvent.click(TooltipButton);
    expect(TooltipNode).toHaveStyle('opacity: 0');
  });
});
