// src/pages/SignIn.tsx
import { useFormik } from "formik";
import { useNavigate,Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeProvider, ThemeToggle } from "@/components/ThemeProvider";
import { useToast } from "@/utility-components/CustomToast";
import { FaUserGroup } from "react-icons/fa6";
import { Logo, FormField, GoogleSignIn } from "@/components/AuthComponents";
import { SIGN_IN_VALIDATION_SCHEMA, INITIAL_SIGN_IN_VALUES } from "@/validation/auth.validation";
import { googleSignIn, emailSignIn, storeAuthData } from "@/services/auth.service";
import { GoogleCredentialResponse } from "@/types/auth.types";

const SignIn = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      const data = await googleSignIn(credentialResponse);
      storeAuthData(data);
      toast.success("SignIn successful!", { duration: 3000 });
      navigate("/MainPage");
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.response?.data?.message || "Failed to sign in with Google");
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_SIGN_IN_VALUES,
    validationSchema: SIGN_IN_VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        const data = await emailSignIn(values);
        storeAuthData(data);
        toast.success("SignIn successful!");
        navigate("/MainPage");
      } catch (error: any) {
        console.error("Error:", error);
        toast.error("please check your email and password");
      }
    },
  });

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="absolute top-4 left-4">
          <Logo />
        </div>

        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="flex justify-center items-center space-x-2 text-2xl font-bold">
              <FaUserGroup size={28} />
              <span>Sign In</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back! Please enter your username or sign in with Google.
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <GoogleSignIn 
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google sign in failed. Please try again.")}
            />
          </div>

          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <FormField
              id="username"
              label="Email"
              type="email"
              placeholder="Enter your Email"
              error={formik.errors.username}
              touched={formik.touched.username}
              {...formik.getFieldProps("username")}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={formik.errors.password}
              touched={formik.touched.password}
              {...formik.getFieldProps("password")}
            />

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
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
    </ThemeProvider>
  );
};

export default SignIn;