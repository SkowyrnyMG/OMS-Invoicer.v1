import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  fireEvent,
  leftClick,
} from 'utils/tests/test-helper';
import TotalItemCounter from '../total-item-counter';

describe('TotalItemCounter', () => {
  test('should render in the document with correct styles', () => {
    const { container } = renderWithReduxRouter(
      <TotalItemCounter
        bgColor={({ theme: { color } }) => color.primary}
        path='/app/customers'
        title='test-counter'
        counter={3}
      />,
    );

    const TotalItemCounterNode = container.firstChild;

    expect(TotalItemCounterNode).toBeInTheDocument();
    expect(TotalItemCounterNode).toMatchSnapshot();
  });

  test('should redirect to the collection path after click on "View more.." link', () => {
    const testPath = '/app/customers';
    const { history } = renderWithReduxRouter(
      <TotalItemCounter
        bgColor={({ theme: { color } }) => color.primary}
        path={testPath}
        title='test-counter'
        counter={3}
      />,
      {},
      { route: '/app' },
    );

    const RedirectLinkNode = screen.getByRole('link', { name: 'View more..' });
    const initialPath = history.location.pathname;

    fireEvent.click(RedirectLinkNode, leftClick);

    const finalPath = history.location.pathname;

    expect(initialPath).not.toBe(finalPath);
    expect(finalPath).toBe(testPath);
  });
});
