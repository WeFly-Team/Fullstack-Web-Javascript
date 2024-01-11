import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Register from '../Register';

describe('Register Page', () => {
  it('should render register page', () => {
    render(<Register />);

    const registerText = screen.getByText('REGISTER NOW!');
    expect(registerText).toBeVisible();
  });

  it('should get validation error', async () => {
    render(<Register />);

    const buttonSignUp = screen.getByRole('button', { name: 'Sign Up' });
    expect(buttonSignUp).toBeVisible();

    fireEvent.click(buttonSignUp);

    expect(await screen.findByText(/Email is required/i)).toBeVisible();
    expect(await screen.findByText(/full name is required/i)).toBeVisible();
    expect(await screen.findByText(/phone number is required/i)).toBeVisible();
    expect(await screen.findByText(/password is required/i)).toBeVisible();

    const inputEmail = screen.getByPlaceholderText(/example@gmail.com/i);
    const inputPhonenumber = screen.getByPlaceholderText(/081234567890/i);
    const inputPassword = screen.getByPlaceholderText('*******');

    fireEvent.change(inputEmail, { target: { value: 'ngasal' } });
    fireEvent.change(inputPhonenumber, { target: { value: '09264385' } });
    fireEvent.change(inputPassword, { target: { value: 'zioucxhuh' } });

    expect(await screen.findByText(/Please input a valid email format/i));
    expect(await screen.findByText(/invalid phone number/i));
    expect(
      await screen.findByText(
        /Password require minimum eight characters, at least one letter and one number/i
      )
    );
  });
});
