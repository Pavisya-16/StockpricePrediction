import axios from 'axios';

const SignInApi = async (values: { email: string; password: string }) => {
  console.log("values", values);
  
  // Prepare the data in URL-encoded format
  const data = new URLSearchParams();
  data.append('username', values.email);
  data.append('password', values.password);
  
  try {
    // Send the request with Content-Type: application/x-www-form-urlencoded
    const response = await axios.post('http://192.168.5.91:8000/auth/login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data; // Return the response data
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'An error occurred during sign in');
  }
};

export default SignInApi;
