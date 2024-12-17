import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import SignUpApi from '@/api/SignUpApi';


const Signup = () => {
  const navigate = useNavigate();

  // Formik configuration
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
          const data = await SignUpApi(values); // Use imported registerUser function
          console.log('Success:', data);
          alert('Signup successful! Please login.');
          navigate('/Signin'); // Navigate after successful signup
        } catch (error: any) {
          console.error('Error:', error.message);
          alert(error.message);
        } 
    }
    
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 via-gray-200 to-slate-300 shadow-lg">
      <div className="w-full max-w-md bg-white rounded-xl border-3 border-black border-b-slate-700 shadow-slate-800 shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="flex justify-center items-center space-x-2">
            <FaUserPlus size={28} />
            <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
          </h2>
          <p className="text-sm text-gray-600">Create an account to get started</p>
        </div>

        {formik.errors.username || formik.errors.email || formik.errors.password ? (
          <div className="mb-4 text-red-600 text-center">
            {formik.errors.username || formik.errors.email || formik.errors.password}
          </div>
        ) : null}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="flex items-center border-b-2 border-slate-300 py-2">
            <FiUser size={20} className="mr-3 text-slate-500" />
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="w-full bg-transparent border-none focus:outline-none text-gray-800"
            />
          </div>
          {formik.touched.username && formik.errors.username ? (
            <div className="text-sm text-red-500">{formik.errors.username}</div>
          ) : null}

          {/* Email Input */}
          <div className="flex items-center border-b-2 border-slate-300 py-2">
            <FiMail size={20} className="mr-3 text-slate-500" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full bg-transparent border-none focus:outline-none text-gray-800"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-sm text-red-500">{formik.errors.email}</div>
          ) : null}

          {/* Password Input */}
          <div className="flex items-center border-b-2 border-slate-300 py-2">
            <FiLock size={20} className="mr-3 text-slate-500" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full bg-transparent border-none focus:outline-none text-gray-800"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-sm text-red-500">{formik.errors.password}</div>
          ) : null}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 py-2 bg-black text-white rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/Signin" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;


