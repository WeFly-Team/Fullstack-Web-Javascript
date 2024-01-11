import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Login from '../Login';

describe('Register Page', () => {
  it('should render register page', () => {
    render(<Login />);
  });

  it('should get validation error', async () => {
    render(<Login />);

    const buttonSignIn = screen.getByRole('button', { name: 'Sign in' });
    expect(buttonSignIn).toBeVisible();

    fireEvent.click(buttonSignIn);

    expect(await screen.findByText(/Email is required/i)).toBeVisible();
    expect(await screen.findByText(/password is required/i)).toBeVisible();

    const inputEmail = screen.getByPlaceholderText(/Enter your email/i);
    const inputPassword = screen.getByPlaceholderText('*******');

    fireEvent.change(inputEmail, { target: { value: 'ngasal' } });
    fireEvent.change(inputPassword, { target: { value: 'zioucxhuh' } });

    expect(await screen.findByText(/Please input a valid email format/i));
    expect(
      await screen.findByText(
        /Password require minimum eight characters, at least one letter and one number/i
      )
    );
  });
});
