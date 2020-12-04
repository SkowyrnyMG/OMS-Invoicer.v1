import React from 'react';
import styled from 'styled-components';

import Button from 'components/atoms/button/button';

const Wrapper = styled.aside`
  > * {
    margin-bottom: 0.5rem;
  }
`;

const ActionMenu = () => (
  <Wrapper>
    <Button>Add new</Button>
    <Button>Edit</Button>
    <Button>delete</Button>
  </Wrapper>
);

export default ActionMenu;
