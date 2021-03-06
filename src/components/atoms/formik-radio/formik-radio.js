import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage, Field } from 'formik';
import ErrorMsg from 'components/atoms/error-msg/error-msg';

const StyledRadio = styled(Field)`
  position: absolute;
  opacity: 0;
  width: fit-content;
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
`;

const FormikRadio = ({
  name,
  error,
  touched,
  value,
  displayError,
  ...rest
}) => (
  <>
    <StyledRadio name={name} id={`${name}-${value}`} value={value} {...rest} />
    <StyledLabel htmlFor={`${name}-${value}`} error={error} touched={touched}>
      {value}
      <ErrorMsg>
        <ErrorMessage name={name} />
      </ErrorMsg>
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
  value: PropTypes.string.isRequired,
};

export default FormikRadio;
