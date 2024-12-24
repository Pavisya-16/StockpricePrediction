import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import SignUpApi from '@/api/SignUpApi';
import { ThemeProvider, ThemeToggle } from '@/components/ThemeProvider';
import { GiTorch } from 'react-icons/gi';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await SignUpApi(values);
        console.log('Success:', data);
        alert('Signup successful! Please login.');
        navigate('/Signin');
      } catch (error: any) {
        console.error('Error:', error.message);
        alert(error.message);
      }
    }
  });

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* GiTorch Logo Section */}
        <div className="absolute top-7 left-4">
          <GiTorch
            size={56}
            className="text-white bg-gradient-to-r from-black via-blue-500 to-purple-500 p-3 rounded-full hover:text-black transition duration-300"
          />
        </div>

        {/* Signup Form */}
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="flex justify-center items-center space-x-2 text-2xl font-semibold">
              <FaUserPlus size={28} />
              <span>Sign Up</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create an account to get started
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 py-2">
              <FiUser size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 py-2">
              <FiMail size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 py-2">
              <FiLock size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/Signin" className="text-blue-600 dark:text-blue-400 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
