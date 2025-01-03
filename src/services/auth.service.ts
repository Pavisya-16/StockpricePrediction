import axios from "axios";
import qs from 'qs'; 
import axiosInstance from '../api/axios';

import { GoogleCredentialResponse, AuthResponse, SignInFormValues, SignUpFormValues, SignUpResponse } from "@/types/auth.types";

export const googleSignIn = async (credentialResponse: GoogleCredentialResponse): Promise<AuthResponse> => {
  const { credential } = credentialResponse;
  
  if (!credential) {
    throw new Error("No credential received");
  }

  const response = await axios.post<AuthResponse>(
    `${import.meta.env.VITE_Dev_URL}/auth/auth/google`,
    { credential }
  );

  return response.data;
};

export const emailSignIn = async (values: SignInFormValues): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(
      `${import.meta.env.VITE_Dev_URL}/auth/login`,
      qs.stringify(values), // Convert payload to x-www-form-urlencoded format
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  console.log("response.data",response.data);
  console.log("response.data",response);
  
    return response.data;
  };

export const storeAuthData = (data: AuthResponse) => {
  localStorage.setItem("accessToken", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const SignUpApi = async (values: SignUpFormValues): Promise<SignUpResponse> => {
    
    const response = await axios.post<SignUpResponse>(
      `${import.meta.env.VITE_Dev_URL}/auth/register`,
      values
    );
    return response.data;
  };


  export const requestPasswordReset = async (email: string) => {
    const response = await axios.post(`${import.meta.env.VITE_Dev_URL}/auth/forgot-password`, {
      email
    });
    return response.data;
  };
  
  export const resetPassword = async (token: string, new_password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_Dev_URL}/auth/reset-password`, {
      token,
      new_password
    });
    return response.data;
  };

  

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_Dev_URL}/auth/me`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};
