import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.aside`
  > * {
    margin-bottom: 0.5rem;
  }
`;

const ActionMenu = ({ children }) => <Wrapper>{children}</Wrapper>;

ActionMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ActionMenu;
