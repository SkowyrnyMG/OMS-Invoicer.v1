import React from 'react';
import FormikInput from 'components/atoms/formik-input/formik-input';

const FormikControl = ({ control, ...rest }) => {
  const renderTag = () => {
    switch (control) {
      default:
        return <FormikInput {...rest} />;
    }
  };

  return renderTag();
};

export default FormikControl;
