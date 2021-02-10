import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.aside`
  > * {
    margin-bottom: 0.5rem;
  }

  ${({ theme: { mq } }) => mq.tablet} {
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* grid-auto-rows: min-content; */
    grid-column-gap: 2%;
    justify-items: center;
    margin-bottom: 2rem;

    > * {
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
    }
  }

  ${({ theme: { mq } }) => mq.bigPhoneBreak} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme: { mq } }) => mq.phone} {
    grid-template-columns: 1fr;
  }
`;

const ActionMenu = ({ children }) => <Wrapper>{children}</Wrapper>;

ActionMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ActionMenu;
