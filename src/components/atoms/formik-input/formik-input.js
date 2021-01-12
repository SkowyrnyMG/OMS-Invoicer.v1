import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage, Field } from 'formik';
import ErrorMsg from 'components/atoms/error-msg/error-msg';

const StyledLabel = styled.label`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 3rem;

  &:last-of-type {
    margin-bottom: 4rem;
  }

  input {
    padding: 0.5rem;
    width: 100%;
    height: 3rem;
    font-size: ${({ theme: { fontSize } }) => fontSize.ms};
    color: ${({ theme: { color } }) => color.secondaryFont};
    border: none;
    outline: none;
    border-bottom: 2px solid currentColor;

    border-color: ${({ theme: { color }, error, touched }) => {
      if (error && touched) {
        return color.danger;
      }
      if (error === undefined && touched) {
        return color.success;
      }
      return color.secondaryFont;
    }};

    transition: 0.5s transform;

    :focus {
      transform: translateX(2px);
    }

    :disabled {
      cursor: not-allowed;
    }

    :placeholder-shown + div {
      opacity: 0;
      top: 50%;
    }
  }

  input,
  input::placeholder {
    color: ${({ theme: { color }, error, touched }) => {
      if (error && touched) {
        return color.danger;
      }
      if (error === undefined && touched) {
        return color.success;
      }
      return color.secondaryFont;
    }};

    border-color: currentColor;
  }
`;

const StyledPlaceholder = styled.div`
  position: absolute;
  top: -1rem;
  left: 0.5rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  transform: translateY(-50%);
  transition: all 0.25s;
`;

const FormikInput = ({
  name,
  tagType,
  error,
  touched,
  placeholder,
  ...rest
}) => (
  <StyledLabel htmlFor={name} error={error} touched={touched}>
    <Field
      as={tagType}
      name={name}
      id={name}
      placeholder={placeholder}
      {...rest}
    />
    <StyledPlaceholder>{placeholder}</StyledPlaceholder>
    <ErrorMsg>
      <ErrorMessage name={name} />
    </ErrorMsg>
  </StyledLabel>
);

FormikInput.defaultProps = {
  tagType: 'input',
  placeholder: '',
  error: undefined,
  touched: undefined,
};

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  tagType: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
};

export default FormikInput;
