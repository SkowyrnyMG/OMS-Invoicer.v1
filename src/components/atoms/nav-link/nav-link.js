import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  margin-top: 0;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  color: ${({ linktype, theme: { color } }) => {
    switch (linktype) {
      case 'logout':
        return color.error;
      case 'login':
        return color.primary;
      default:
        return color.mainFont;
    }
  }} !important;
  border-left: 1px solid ${({ theme: { color } }) => color.devider};
  background: none;
  transition: transform 0.25s;
  border: none;

  &:hover {
    transform: translateY(-2px);
  }
`;

const NavLink = ({ children, linktype, path }) => (
  <StyledLink linktype={linktype} to={path}>
    {children}
  </StyledLink>
);

NavLink.defaultProps = {
  linktype: '',
};

NavLink.propTypes = {
  linktype: PropTypes.string,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLink;
