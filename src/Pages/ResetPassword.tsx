import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeProvider, ThemeToggle } from '@/components/ThemeProvider';
import { useToast } from '@/utility-components/CustomToast';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import * as Yup from 'yup';
import { resetPassword } from '@/services/auth.service';

const RESET_PASSWORD_SCHEMA = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const ResetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or expired reset link');
      navigate('/forgot-password');
    }
  }, [token, navigate, toast]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: RESET_PASSWORD_SCHEMA,
    onSubmit: async (values) => {
      try {
        if (!token) throw new Error('Invalid reset token');
        await resetPassword(token, values.password);
        toast.success('Password reset successful! Please login with your new password.');
        navigate('/signin');
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Failed to reset password. Please try again.');
      }
    },
  });

  const renderInputField = ({ name, placeholder }) => {
    const isPasswordField = name === 'password' || name === 'confirmPassword';
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {placeholder}
        </label>
        <div className="relative">
          <input
            {...formik.getFieldProps(name)}
            type={showPassword[name] ? 'text' : 'password'}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg border ${
              formik.errors[name] && formik.touched[name]
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  [name]: !prev[name],
                }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword[name] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
        </div>
        {formik.touched[name] && formik.errors[name] && (
          <p className="mt-1 text-sm text-red-500">{formik.errors[name]}</p>
        )}
      </div>
    );
  };

  const PasswordRequirement = ({ meets, label }) => (
    <div className="flex items-center gap-2">
      {meets ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={`text-sm ${meets ? 'text-green-600' : 'text-red-500'}`}>{label}</span>
    </div>
  );

  const passwordStrength = {
    hasLength: formik.values.password.length >= 8,
    hasNumber: /[0-9]/.test(formik.values.password),
    hasLower: /[a-z]/.test(formik.values.password),
    hasUpper: /[A-Z]/.test(formik.values.password),
    hasSpecial: /[^A-Za-z0-9]/.test(formik.values.password),
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Reset Password</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
              Please enter your new password below.
            </p>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {renderInputField({ name: 'password', placeholder: 'New Password' })}
              {formik.values.password && (
                <div className="mt-2 space-y-1">
                  <PasswordRequirement meets={passwordStrength.hasLength} label="At least 8 characters" />
                  <PasswordRequirement meets={passwordStrength.hasNumber} label="Contains a number" />
                  <PasswordRequirement meets={passwordStrength.hasLower} label="Contains a lowercase letter" />
                  <PasswordRequirement meets={passwordStrength.hasUpper} label="Contains an uppercase letter" />
                  <PasswordRequirement meets={passwordStrength.hasSpecial} label="Contains a special character" />
                </div>
              )}
              {renderInputField({ name: 'confirmPassword', placeholder: 'Confirm Password' })}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ResetPassword;
