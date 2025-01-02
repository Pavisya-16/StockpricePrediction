import axios from "axios";
import qs from 'qs'; 

import { GoogleCredentialResponse, AuthResponse, SignInFormValues } from "@/types/auth.types";

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
  
    return response.data;
  };

export const storeAuthData = (data: AuthResponse) => {
  localStorage.setItem("accessToken", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
};