import * as yup from "yup";

export const LoginValidations = yup.object({
  email: yup
    .string()
    .email()
    .required("Please enter an email"),
  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),

});



export const RegisterValidations = yup.object({
    firstname: yup.string().required("Please enter first name"),
    lastname: yup.string().required("Please enter last name"),
    email: yup
      .string()
      .email()
      .required("Please enter an email"),
    password: yup
      .string()
      .required("No password provided.")
      .min(6, "Password is too short - should be 6 chars minimum."),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });
  



