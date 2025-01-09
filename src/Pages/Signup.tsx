import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeProvider, ThemeToggle } from '@/components/ThemeProvider';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa6';
import { GiTorch } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useToast } from '@/utility-components/CustomToast';
import { IconFormField } from '@/components/FormField';
import { SIGN_UP_VALIDATION_SCHEMA, INITIAL_SIGN_UP_VALUES } from '@/validation/auth.validation';
import { SignUpApi, storeAuthData,googleSignIn, emailSignIn, } from '@/services/auth.service';
import { Logo, FormField, GoogleSignIn } from "@/components/AuthComponents";
import { GoogleCredentialResponse } from "@/types/auth.types";
import LogoExample from '@/components/Logo';
const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

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
    initialValues: INITIAL_SIGN_UP_VALUES,
    validationSchema: SIGN_UP_VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        const data = await SignUpApi(values);
        toast.success('Signup successful! Please login.');
        navigate('/Signin');
      } catch (error: any) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
      }
    },
  });

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="absolute top-7 left-4 border dark:border-gray-300 shadow-white rounded-2xl">
          <Link to="/LandingPage">
            <LogoExample size={16}/>
            </Link>
        </div>

        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 top-1  border dark:border-gray-300 shadow-white">
          {/* Header */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:bg-slate-100 border dark:border-gray-900">
                    <FaUserPlus className="h-10 w-10 text-white dark:text-black" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-0">Sign Up</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create an account to get started!
                </p>
              </div>
          

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <IconFormField
              id="name"
              name="name"
              type="text"
              placeholder="Username"
              icon={FiUser}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
            />

            <IconFormField
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              icon={FiMail}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
            />

            <IconFormField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              icon={FiLock}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              touched={formik.touched.password}
            />

            <Button
              type="submit"
              className="w-full mt-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Sign Up
            </Button>
          </form>
          <div className="flex items-center">
            <hr className="flex-grow border-gray-300 " />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex justify-center mb-4">
            <GoogleSignIn 
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google sign in failed. Please try again.")}
            />
          </div>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/Signin" className="text-blue-600 dark:text-slate-300 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignUp;