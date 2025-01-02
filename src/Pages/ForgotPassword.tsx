import React from 'react';
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeProvider, ThemeToggle } from "@/components/ThemeProvider";
import { useToast } from "@/utility-components/CustomToast";
import { FormField, Logo } from "@/components/AuthComponents";
import { KeyRound } from 'lucide-react';
import * as Yup from "yup";
import { requestPasswordReset } from '@/services/auth.service';
import LogoExample from '@/components/Logo';

const FORGOT_PASSWORD_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: FORGOT_PASSWORD_SCHEMA,
    onSubmit: async (values) => {
      try {
        const response = await requestPasswordReset(values.email);
        toast.success(response.message);
        // Extract token from reset_link
        const token = new URL(response.reset_link).searchParams.get('token');
        if (token) {
          navigate(`/reset-password?token=${token}`);
        }
      } catch (error: any) {
        console.error("Error:", error);
        toast.error(error.response?.data?.message || "Please check your Email ID");
      }
    },
  });

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="absolute top-4 left-4">
          <LogoExample size={16}/>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <KeyRound className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password?</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={formik.errors.email}
                touched={formik.touched.email}
                {...formik.getFieldProps("email")}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/signin"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ForgotPassword;