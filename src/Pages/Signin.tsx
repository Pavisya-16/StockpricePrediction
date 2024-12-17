import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaUserGroup } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import SignInApi from '../api/SignInApi';

const Signin = () => {
  const navigate = useNavigate();

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Call the SignInApi function with the form values
        const data = await SignInApi(values); 
        console.log('Success:', data); // Log the successful response
        alert('SignIn successful!');
        navigate('/MainPage'); // Navigate to MainPage on successful sign-in
      } catch (error: any) {
        // Handle any errors that occur during the sign-in process
        console.error('Error:', error); // Log the error
        alert(error.message); // Show the error message to the user
      } 
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 via-gray-200 to-slate-300 shadow-lg">
      {/* Main Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border-b-slate-700 p-8 space-y-6 shadow-slate-800">
        {/* Header */}
        <div className="text-center">
          <h2 className="flex justify-center items-center space-x-2">
            <FaUserGroup size={28} />
            <span className="text-2xl font-bold text-gray-800">Sign In</span>
          </h2>
          <p className="text-sm text-gray-600">Welcome back! Please enter your details.</p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
              className={`mt-1 w-full ${formik.touched.email && formik.errors.email ? 'border-red-600' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
              className={`mt-1 w-full ${formik.touched.password && formik.errors.password ? 'border-red-600' : ''}`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <Button className="w-full" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-800 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
