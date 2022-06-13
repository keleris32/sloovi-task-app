import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid Email address')
    .required('Email Address is required'),

  password: yup
    .string()
    .trim()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`)
    .required('Password is required'),
});
