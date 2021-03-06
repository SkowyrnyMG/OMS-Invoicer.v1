import React from 'react';
import styled from 'styled-components';
import { useField, useFormikContext, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ErrorMsg from 'components/atoms/error-msg/error-msg';

const Wrapper = styled.div`
  * {
    font-family: 'Montserrat' !important;
  }
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
      cursor: pointer;

      transition: 0.5s transform;

      :focus {
        transform: translateX(2px);
      }

      :disabled {
        background: ${({ theme: { color } }) => color.transparentDark};
        color: ${({ theme: { color } }) => color.mainFont};
        font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }

  // * bottom popup arorw
  .react-datepicker__triangle {
    display: none;
  }

  //* calendar popup window
  .react-datepicker {
    width: 100%;
    z-index: 999999999999999;
    ${({ theme: { mq } }) => mq.bigDesktop} {
      left: 0 !important;
    }
  }

  .react-datepicker-popper {
    ${({ theme: { mq } }) => mq.bigDesktop} {
    }
  }

  //* calendar day
  .react-datepicker__day {
    padding: 5px 15px;
    width: 40px;
    text-align: center;
    font-size: ${({ theme: { fontSize } }) => fontSize.ms};
    font-weight: ${({ theme: { fontWeight } }) => fontWeight.thin};

    ${({ theme: { mq } }) => mq.smallTablet} {
      padding: 2px 5px;
    }
    ${({ theme: { mq } }) => mq.bigPhone} {
      width: 35px;
    }
    ${({ theme: { mq } }) => mq.phone} {
      width: 32px;
    }
  }

  //* outside month
  .react-datepicker__day--outside-month {
    color: ${({ theme: { color } }) => color.transparentMain} !important;
  }

  //* weekend day
  .react-datepicker__day--weekend {
    color: ${({ theme: { color } }) => color.secondaryFont};
    font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  }

  //* selected day
  .react-datepicker__day--selected {
    background-color: ${({ theme: { color } }) => color.primary};
    color: ${({ theme: { color } }) => color.tertiaryFont};
  }

  //* calendar header - day names
  .react-datepicker__day-name {
    padding: 15px;
    width: 40px;
    font-size: ${({ theme: { fontSize } }) => fontSize.s};

    ${({ theme: { mq } }) => mq.bigPhone} {
      width: 35px;
      font-size: ${({ theme: { fontSize } }) => fontSize.s};
      padding: 5px;
    }

    ${({ theme: { mq } }) => mq.phone} {
      width: 32px;
    }
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
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledPlaceholder = styled.div`
  position: absolute;
  top: -60%;
  align-self: flex-end;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  transition: all 0.25s;
  pointer-events: none;
`;

const FormikDatePicker = ({ placeholder, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <Wrapper data-testid='datepicker'>
      <DatePickerWrapper>
        <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        <DatePicker
          {...field}
          {...props}
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
          autoComplete='off'
          dateFormat='yyyy-MM-dd'
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
