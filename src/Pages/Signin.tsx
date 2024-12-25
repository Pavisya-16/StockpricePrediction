import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaUserGroup } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import SignInApi from "../api/SignInApi";
import { ThemeProvider, ThemeToggle } from "@/components/ThemeProvider";
import { GiTorch } from "react-icons/gi";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Signin = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log("credentialResponse", credentialResponse);

    try {
      // Get the credential from the response
      const { credential } = credentialResponse;
      if (!credential) {
        throw new Error("No credential received");
      }

      // Send the credential to your backend
      const response = await fetch("http://127.0.0.1:8000/auth/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }), // Send in body instead of URL
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to authenticate");
      }

      const data = await response.json();

      // Store tokens and user data
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to main page
      navigate("/MainPage");
    } catch (error:any) {
      console.error("Authentication error:", error);
      alert(error.message || "Failed to sign in with Google");
    }
  };

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await SignInApi(values);
        console.log("Success:", data);
        alert("SignIn successful!");
        navigate("/MainPage");
      } catch (error: any) {
        console.error("Error:", error);
        alert(error.message);
      }
    },
  });

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="absolute top-4 left-4">
          {/* Logo Section */}
          <Link to="/LandingPage">
            <GiTorch
              size={56}
              className="mr-5 text-white bg-gradient-to-r from-black via-blue-500 to-purple-500 p-3 rounded-full hover:text-black transition duration-300"
            />
          </Link>
        </div>

        {/* Main Container */}
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="flex justify-center items-center space-x-2 text-2xl font-bold">
              <FaUserGroup size={28} />
              <span>Sign In</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back! Please enter your details or sign in with Google.
            </p>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center mb-4">
            <GoogleOAuthProvider clientId="277686266990-aoreajgo5kblj2e0npl3hbjr59j6grdk.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.error("Login Failed");
                  alert("Google sign in failed. Please try again.");
                }}
                useOneTap
                scope="email profile"
              />
            </GoogleOAuthProvider>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
                className={`mt-1 w-full ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-600"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
                className={`mt-1 w-full ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-600"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-800 dark:text-blue-400 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Signin;
