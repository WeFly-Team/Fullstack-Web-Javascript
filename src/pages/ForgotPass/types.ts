import { createContext } from 'react';

export interface IFormInput {
  email: string;
}
export interface IPasswordInput {
  password: string;
  confirmPassword: string;
}

export interface forgotPasswordContextType {
  handleEmail: (email: string) => void;
  handleOtpCode: (otp: string) => void;
  handleComponent: (comp: string) => void;
  email: string;
  otpCode: string;
}

export const ForgotPassContext =
  createContext<forgotPasswordContextType | null>(null);
