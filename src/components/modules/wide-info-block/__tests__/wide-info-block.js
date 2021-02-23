import React from 'react';

import { renderWithReduxRouter, screen } from 'utils/tests/test-helper';
import { ReactComponent as testIcon } from 'assets/svg/help-icon.svg';
import WideInfoBlock from '../wide-info-block';

describe('WideInfoBlock', () => {
  test('should display in the document with correct styles', () => {
    const { container } = renderWithReduxRouter(
      <WideInfoBlock Icon={testIcon} counter={2} title='test-title'>
        test-body-text
      </WideInfoBlock>,
    );

    const WideInfoBlockNode = container.firstChild;

    expect(WideInfoBlockNode).toBeInTheDocument();
    expect(WideInfoBlockNode).toMatchSnapshot();
  });

  test('should display image after receiving image prop', () => {
    renderWithReduxRouter(
      <WideInfoBlock
        image='https://test.pl'
        Icon={testIcon}
        counter={2}
        title='test-title'
      >
        test-body-text
      </WideInfoBlock>,
    );

    const imageNode = screen.getByRole('img', { name: 'position image' });

    expect(imageNode).toBeInTheDocument();
  });
});
