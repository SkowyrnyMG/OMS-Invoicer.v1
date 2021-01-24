import React from 'react';
import PropTypes from 'prop-types';
import FormikInput from 'components/atoms/formik-input/formik-input';
import FormikRadio from 'components/atoms/formik-radio/formik-radio';
import FormikSelect from 'components/atoms/formik-select/formik-select';
import FormikDatePicker from 'components/atoms/formik-date-picker/formik-date-picker';

const FormikControl = ({ control, ...rest }) => {
  const renderTag = () => {
    switch (control) {
      case 'radio':
        return <FormikRadio {...rest} />;
      case 'select':
        return <FormikSelect {...rest} />;
      case 'date':
        return <FormikDatePicker {...rest} />;
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
