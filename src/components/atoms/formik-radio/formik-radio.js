import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'formik';

const StyledRadio = styled(Field)`
  position: absolute;
  opacity: 0;
  appearance: none;
  :checked + label {
    font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
    opacity: 1;
  }
`;

const StyledLabel = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;
  opacity: 0.5;
  cursor: pointer;

  :not(:last-child) {
    border-right: 1px solid ${({ theme: { color } }) => color.devider};
  }

  &:last-of-type {
    margin-bottom: 4rem;
  }

  /* input */
  /* input::placeholder {
    color: ${({ theme: { color }, error, touched }) => {
    if (error && touched) {
      return color.danger;
    }
    if (error === undefined && touched) {
      return color.success;
    }
    return color.secondaryFont;
  }}; */

  /* border-color: currentColor; */
  /* } */
`;

const FormikRadio = ({ name, error, touched, value, ...rest }) => (
  <>
    <StyledRadio name={name} id={`${name}-${value}`} value={value} {...rest} />
    <StyledLabel htmlFor={`${name}-${value}`} error={error} touched={touched}>
      {value}
    </StyledLabel>
  </>
);

FormikRadio.defaultProps = {
  error: undefined,
  touched: undefined,
};

FormikRadio.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
};

export default FormikRadio;
