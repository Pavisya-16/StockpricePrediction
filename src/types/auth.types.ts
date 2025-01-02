
export interface SignInFormValues {
    username: string;
    password: string;
  }

  export interface GoogleCredentialResponse {
    credential: string;
    clientId: string;
    select_by: string;
  }

  export interface AuthResponse {
    access_token: string;
    user: {
      // Add user properties based on your API response
      id: string;
      email: string;
      name?: string;
      [key: string]: any;
    };
  }



export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    [key: string]: any;
  };
}