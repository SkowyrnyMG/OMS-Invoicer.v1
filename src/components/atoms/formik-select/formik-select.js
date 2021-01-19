import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage, Field } from 'formik';
import ErrorMsg from 'components/atoms/error-msg/error-msg';

// const StyledRadio = styled(Field)`
//   position: absolute;
//   opacity: 0;
//   appearance: none;
//   :checked + label {
//     font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
//     opacity: 1;
//   }
// `;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 3rem;
  width: 100%;
  color: ${({ theme: { color } }) => color.mainFont};
  /* opacity: 0.5; */
  cursor: pointer;

  :not(:last-child) {
    border-right: 1px solid ${({ theme: { color } }) => color.devider};
  }

  &:last-of-type {
    margin-bottom: 4rem;
  }

  select {
    padding: 0.25rem 1rem;
    font-size: ${({ theme: { fontSize } }) => fontSize.regular};
  }
`;

const LabelText = styled.span`
  margin-right: 2rem;
`;

const StyledOption = styled.option`
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
`;

const FormikSelect = ({
  name,
  error,
  touched,
  value,
  displayError,
  options,
  defaultValue,
  placeholder,
  ...rest
}) => (
  <StyledLabel htmlFor={name} error={error} touched={touched}>
    <LabelText>{placeholder}</LabelText>
    <Field
      as='select'
      name={name}
      id={name}
      value={value}
      defaultValue={defaultValue}
      {...rest}
    >
      {options.map((option) => (
        <StyledOption key={option} value={option}>
          {option}
        </StyledOption>
      ))}
    </Field>
    <ErrorMsg>
      <ErrorMessage name={name} />
    </ErrorMsg>
  </StyledLabel>
);

FormikSelect.defaultProps = {
  error: undefined,
  touched: undefined,
};

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  // value: PropTypes.string.isRequired,
};

export default FormikSelect;
