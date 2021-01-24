import React from 'react';
import styled from 'styled-components';
import { useField, useFormikContext, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorMsg from 'components/atoms/error-msg/error-msg';

const Wrapper = styled.div`
  margin-bottom: 4rem;
  .react-datepicker-wrapper {
    display: inline-block;
    padding: 1rem;
    border: 0;
  }

  //* input-wrapper
  .react-datepicker-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;

    input {
      width: 100%;
      height: 3rem;
      font-size: ${({ theme: { fontSize } }) => fontSize.ms};
      color: ${({ theme: { color } }) => color.secondaryFont};
      border: none;
      outline: none;
      border-bottom: 2px solid currentColor;
      cursor: pointer;

      /* border-color: ${({ theme: { color }, error, touched }) => {
        if (error && touched) {
          return color.danger;
        }
        if (error === undefined && touched) {
          return color.success;
        }
        return color.secondaryFont;
      }}; */

      transition: 0.5s transform;

      :focus {
        transform: translateX(2px);
      }

      :disabled {
        cursor: not-allowed;
      }
    }

    /* input,
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
    } */
  }

  //* calendar popup window
  .react-datepicker {
    width: 100%;
  }

  //* calendar day
  .react-datepicker__day {
    margin: 0.5rem;
    padding: 0.5rem;
    font-size: ${({ theme: { fontSize } }) => fontSize.ms};
  }

  //* calendar header - day names
  .react-datepicker__day-name {
    margin: 1rem;
    font-size: ${({ theme: { fontSize } }) => fontSize.s};
  }

  //* calendar header - month navigation arrows
  .react-datepicker__navigation {
    width: 0;
    height: 0;
    border-width: 0.9rem;
  }

  //* header - current month container
  .react-datepicker__current-month {
    font-size: ${({ theme: { fontSize } }) => fontSize.s};
  }

  //* calendar container
  .react-datepicker__month-container {
    width: 100%;
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledPlaceholder = styled.div`
  flex-basis: 40%;
  align-self: flex-end;
  font-size: ${({ theme: { fontSize } }) => fontSize.regular};
  transition: all 0.25s;
  pointer-events: none;
`;

const FormikDatePicker = ({ placeholder, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <Wrapper>
      <DatePickerWrapper>
        <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        <DatePicker
          {...field}
          {...props}
          dateFormat='dd.MM.yyyy'
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
        />
      </DatePickerWrapper>
      <ErrorMsg>
        <ErrorMessage name={field.name} />
      </ErrorMsg>
    </Wrapper>
  );
};

export default FormikDatePicker;
