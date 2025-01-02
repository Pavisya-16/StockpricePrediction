// src/components/auth/AuthComponents.tsx
import { Link } from "react-router-dom";
import { GiTorch } from "react-icons/gi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleCredentialResponse } from "@/types/auth.types";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  [key: string]: any;
}

export const Logo = () => (
  <Link to="/LandingPage">
    <GiTorch
      size={56}
      className="mr-5 text-white bg-gradient-to-r from-black via-blue-500 to-purple-500 p-3 rounded-full hover:text-black transition duration-300"
    />
  </Link>
);

export const FormField = ({ 
  id, 
  label, 
  type, 
  placeholder, 
  error, 
  touched, 
  ...props 
}: FormFieldProps) => (
  <div>
    <Label htmlFor={id} className="block text-sm font-medium">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`mt-1 w-full ${touched && error ? "border-red-600" : ""}`}
      {...props}
    />
    {touched && error && (
      <div className="text-red-600 text-sm mt-1">{error}</div>
    )}
  </div>
);

export const GoogleSignIn = ({ 
  onSuccess, 
  onError 
}: { 
  onSuccess: (response: GoogleCredentialResponse) => void;
  onError?: () => void;
}) => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID}>
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError || (() => {
        console.error("Login Failed");
      })}
      useOneTap
      scope="email profile"
    />
  </GoogleOAuthProvider>
);