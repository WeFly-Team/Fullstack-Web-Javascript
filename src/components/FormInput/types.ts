import React, { ChangeEvent } from 'react';

export interface FormProps {
  children: React.ReactNode;
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  //   value: string | number;
  value: any;
  name: string;
  placeholder: string;
  //   error: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
