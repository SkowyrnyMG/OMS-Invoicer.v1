import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
  > * {
    margin-bottom: 0.5rem;
  }
`;

const ActionMenu = ({ children }) => <Wrapper>{children}</Wrapper>;

export default ActionMenu;
