import React from 'react';
import * as Yup from 'yup';
import ErrorMsg from 'components/atoms/error-msg/error-msg';

export const useValidationSchema = (type) => {
  switch (type) {
    case 'login':
      return Yup.object().shape({
        email: Yup.string()
          .email(<ErrorMsg>Wrong email adress</ErrorMsg>)
          .required(<ErrorMsg>Required!</ErrorMsg>),
        password: Yup.string().required(<ErrorMsg>Required!</ErrorMsg>),
      });
    case 'register':
      return Yup.object().shape({
        name: Yup.string()
          .min(3, <ErrorMsg>Should be at least 3 signs long!</ErrorMsg>)
          .max(15, <ErrorMsg>Should&quo;t be longer than 15</ErrorMsg>)
          .required(<ErrorMsg>Required!</ErrorMsg>),
        lastname: Yup.string()
          .min(3, <ErrorMsg>Should be longer than 3</ErrorMsg>)
          .max(15, <ErrorMsg>Shouldn&quo;t be longer than 15</ErrorMsg>)
          .required(<ErrorMsg>Required!</ErrorMsg>),
        email: Yup.string()
          .email(<ErrorMsg>Wrong email adress</ErrorMsg>)
          .required(<ErrorMsg>Required!</ErrorMsg>),
        password: Yup.string().required(<ErrorMsg>Required!</ErrorMsg>),
      });
    default:
      return '';
  }
};
