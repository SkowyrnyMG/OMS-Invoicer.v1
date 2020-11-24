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
      });
    default:
      return '';
  }
};
