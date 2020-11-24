import React from 'react';
import styled from 'styled-components';
import { ErrorMessage, Field } from 'formik';
import ErrorMsg from 'components/atoms/error-msg/error-msg';

const StyledLabel = styled.label`
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

const FormikInput = ({ name, tagType, error, touched, ...rest }) => (
  <StyledLabel htmlFor={name} error={error} touched={touched}>
    <Field as={tagType} name={name} id={name} {...rest} />
    <ErrorMsg>
      <ErrorMessage name={name} />
    </ErrorMsg>
  </StyledLabel>
);

export default FormikInput;
