import { createContext } from 'react';

export interface IFormInput {
  email: string;
}

export interface forgotPasswordContextType {
  handleEmail: (email: string) => void;
  handleComponent: (comp: string) => void;
  email: string;
}

export const FrogotPassContext =
  createContext<forgotPasswordContextType | null>(null);
