import * as Yup from "yup";

export const SIGN_IN_VALIDATION_SCHEMA = Yup.object({
  username: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9@.]+$/,
      "Email can only contain letters, numbers, @ and ."
    ),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const INITIAL_SIGN_IN_VALUES = {
  username: "",
  password: "",
};

// Example of valid credentials for reference
export const EXAMPLE_CREDENTIALS = {
  username: "palani@gmail.com",
  password: "12345"
};


export const SIGN_UP_VALIDATION_SCHEMA = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const INITIAL_SIGN_UP_VALUES = {
  username: '',
  email: '',
  password: '',
};