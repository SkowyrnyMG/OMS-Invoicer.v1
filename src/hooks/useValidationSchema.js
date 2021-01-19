import * as Yup from 'yup';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;

export const useValidationSchema = (type) => {
  switch (type) {
    case 'login':
      return Yup.object().shape({
        email: Yup.string().email('Wrong email adress').required('Required!'),
        password: Yup.string().required('Required!'),
      });
    case 'register':
      return Yup.object().shape({
        name: Yup.string()
          .min(3, 'Should be at least 3 signs long!')
          .max(15, `Should't be longer than 15`)
          .required('Required!'),
        lastname: Yup.string()
          .min(3, 'Should be longer than 3')
          .max(15, `Shouldn't be longer than 15`)
          .required('Required!'),
        email: Yup.string().email('Wrong email adress').required('Required!'),
        password: Yup.string()
          .min(8, 'Too short! At least 8 signs long')
          .max(35, 'Too long! Not logner thatn 35 signs')
          .matches(
            passwordRegex,
            'Must contain one uppercase, one lowercase, one Number and one special case character'
          )
          .required('Required!'),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required!'),
      });
    case 'customers':
      return Yup.object().shape({
        name: Yup.string()
          .min(5, 'Too short! At least 5 signs long!')
          .max(60, 'Too long! not longer thatn 60 signs')
          .required('Required!'),
        vat_number: Yup.string()
          .min(6, 'At least 6 signs!')
          .max(12, 'VAT cannot be longer than 12 signs')
          .required('Required!'),
        country: Yup.string()
          .min(2, 'At least 2 signs long!')
          .max(25, 'Not longer than 25 signs')
          .required('Required!'),
        town: Yup.string()
          .min(2, 'At least 5 sighns long')
          .max(35, 'Not longer than 25 signs')
          .required('Required!'),
        street: Yup.string()
          .min(5, 'At least 5 sighns long')
          .max(70, 'Not longer than 25 signs')
          .required('Required!'),
        postCode: Yup.string()
          .min(5, 'not shortern thant 5 signs')
          .max(8, 'not longer than 8 signs')
          .required('Required'),
        contactPerson: Yup.string()
          .min(6, 'Should be longer thatnm 16 signs')
          .max(30, 'Not logner than 30 signs'),
        contactEmail: Yup.string().email('Provide correct email!'),
        contactPhone: Yup.string()
          .min(6, 'Phone cannot be shorter thatn 6 signs')
          .max(20, 'Phone cannot be longer than 20 signs'),
      });
    case 'config':
      return Yup.object().shape({
        mainInvoicePrefix: Yup.string()
          .min(2, 'Prefix should be at least two signs long!')
          .max(5, 'Prefix cannot be longer than 5 signs!')
          .matches(/^[a-zA-Z]+$/, 'Prefix should contain only letters!')
          .required('Prefix is required!'),
        mainOrderPrefix: Yup.string()
          .min(2, 'Prefix should be at least two signs long!')
          .max(5, 'Prefix cannot be longer than 5 signs!')
          .matches(/^[a-zA-Z]+$/, 'Prefix should contain only letters!')
          .required('Prefix is required!'),
        rootCompanyName: Yup.string()
          .min(4, 'Company name should be at least 4 signs long!')
          .max(100, 'Company name should not be longer than 100 signs!')
          .required('Company name is required!'),
        rootVat: Yup.string()
          .min(6, 'VAT number should be at least 6 signs long!')
          .max(16, 'VAT number should not be longer than 10 signs!')
          .required('VAT number is required!'),
        rootStreet: Yup.string()
          .min(4, 'Street should be at least 4 signs long!')
          .max(75, 'Street should not be longer than 75 signs!')
          .required('Street is required!'),
        rootPostCode: Yup.string()
          .min(4, 'Post code should be at least 4 signs long!')
          .max(8, 'Post code should not be longer than 8 signs long!')
          .required('Post code is required!'),
        rootTown: Yup.string()
          .min(3, 'Town should be at lest 3 signs long!')
          .max(40, 'Town should not be longer than 40 signs!')
          .required('Town is required'),
        rootCountry: Yup.string()
          .min(3, 'Country should be at lest 3 signs long!')
          .max(30, 'Country should not be longer than 30 signs long!'),
      });
    case 'newOrder':
      return Yup.object().shape({
        price: Yup.number().required('Price is required!'),
        currency: Yup.string()
          .min(2, 'Currency shortcut should be at least 2 signs long!')
          .max(4, 'Currency shortcut should be not longer than 3 signs')
          .required('Currency is required!'),
        desc: Yup.string()
          .min(5, 'Description should be at least 5 signs long!')
          .max(120, 'Description should not be longer than 120 signs!')
          .required('Description is required'),
        status: Yup.string().required('Status is required!'),
        customer_name: Yup.string().required(
          'You have to choose client from your database'
        ),
        customer_vat: Yup.string().required(
          'You have to choose client from your database'
        ),
        customer_address: Yup.string().required(
          'You have to choose client from your database'
        ),
      });
    case 'newInvoice':
      return Yup.object().shape({
        order_number: Yup.string().required('Order is required!'),
        price: Yup.number().required('Price is required!'),
        currency: Yup.string()
          .min(2, 'Currency shortcut should be at least 2 signs long!')
          .max(4, 'Currency shortcut should be not longer than 3 signs')
          .required('Currency is required!'),
        desc: Yup.string()
          .min(5, 'Description should be at least 5 signs long!')
          .max(120, 'Description should not be longer than 120 signs!')
          .required('Description is required'),
        payment_status: Yup.string().required('Status is required!'),
        payment_value: Yup.number().required('Payment value is required!'),
        customer_name: Yup.string().required(
          'You have to choose client from your database'
        ),
        customer_vat: Yup.string().required(
          'You have to choose client from your database'
        ),
        customer_address: Yup.string().required(
          'You have to choose client from your database'
        ),
      });
    default:
      return '';
  }
};
