import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeProvider";
import { useToast } from "@/utility-components/CustomToast";
import { FaUserGroup } from "react-icons/fa6";
import { FormField, GoogleSignIn } from "@/components/AuthComponents";
import axiosInstance from "../api/axios";
import LogoExample from "@/components/Logo";
import { useDispatch } from 'react-redux';
import { login } from '../Redux/authSlice';

import {
  SIGN_IN_VALIDATION_SCHEMA,
  INITIAL_SIGN_IN_VALUES,
} from "@/validation/auth.validation";
import {
  googleSignIn,
  emailSignIn,
  storeAuthData,
} from "@/services/auth.service";
import { GoogleCredentialResponse } from "@/types/auth.types";

const SignIn = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  // Handle Google Sign-In success
  const handleGoogleSuccess = async (
    credentialResponse: GoogleCredentialResponse
  ) => {
    try {
      const data = await googleSignIn(credentialResponse);
      storeAuthData(data);
      dispatch(login(data.access_token));
      toast.success("Sign in successful!", { duration: 3000 });
      navigate("/search");
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(
        error.response?.data?.message || "Failed to sign in with Google"
      );
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: INITIAL_SIGN_IN_VALUES,
    validationSchema: SIGN_IN_VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        const data = await emailSignIn(values);
        const userResponse = await axiosInstance.get(
          `${import.meta.env.VITE_Dev_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${data.access_token}` },
          }
        );

        const userData = {
          access_token: data.access_token,
          token_type: data.token_type,
          user: {
            created_at: userResponse?.data.created_at,
            email: userResponse?.data.email,
            name: userResponse?.data.name,
            picture: userResponse?.data.picture,
          },
        };
        // console.log("userData",userData);
        localStorage.setItem("accessToken", userData.access_token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        // storeAuthData(userData);
        toast.success("Sign in successful!");
        dispatch(login(userData.access_token));
        if (userResponse.status === 200) navigate("/search");
      } catch (error: any) {
        console.error("Sign-in error:", error);
        toast.error("Please check your email and password.");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="absolute top-4 left-4">
        <LogoExample size={16} />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <FaUserGroup
                className="h-8 w-8 text-blue-600 dark:text-blue-400"
                size={28}
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please enter your Email or sign in with Google.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormField
            id="username"
            label="Email"
            type="email"
            placeholder="Enter your Email"
            error={formik.errors.username}
            touched={formik.touched.username}
            className="rounded-full"
            {...formik.getFieldProps("username")}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={formik.errors.password}
            touched={formik.touched.password}
            className="rounded-full"
            {...formik.getFieldProps("password")}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <div className="flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <GoogleSignIn
          onSuccess={handleGoogleSuccess}
          onError={() =>
            toast.error("Google sign in failed. Please try again.")
          }
        />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-800 dark:text-blue-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
