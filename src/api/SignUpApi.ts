// src/api/authApi.ts

import axios from 'axios';

// Function to handle API call for signup
const SignUpApi = async (values: { username: string; email: string; password: string }) => {
  try {
    const response = await axios.post('http://192.168.5.91:8000/auth/register', {
      name: values.username,
      email: values.email,
      password: values.password,
    });
    return response.data; // Return response data for further processing
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Signup failed');
    }
    throw new Error('An error occurred. Please try again.');
  }
};

export default SignUpApi
