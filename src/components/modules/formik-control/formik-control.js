import React from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/atoms/formik-input/formik-input';
import FormikRadio from 'components/atoms/formik-radio/formik-radio';

const FormikControl = ({ control, ...rest }) => {
  const renderTag = () => {
    switch (control) {
      case 'radio':
        return <FormikRadio {...rest} />;
      default:
        return <FormikInput {...rest} />;
    }
  };

  return renderTag();
};

FormikControl.defaultProps = {
  control: '',
};

FormikControl.propTypes = {
  control: PropTypes.string,
};

export default FormikControl;
