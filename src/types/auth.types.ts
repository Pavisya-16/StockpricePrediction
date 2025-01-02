
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