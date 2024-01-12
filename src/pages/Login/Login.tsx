// import { ChangeEvent, useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import { useGoogleLogin } from '@react-oauth/google';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { IFormInput } from './types';
import { useAuth } from '../../customHooks/useAuth/useAuth';
import axiosInstance from '../../axios/axios';
import { useState } from 'react';
import { AxiosError } from 'axios';

const Login = () => {
  // useState
  const [errorMessage, setErrorMessage] = useState<string>('');
  // useAuth
  const { login } = useAuth();
  // hook form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await axiosInstance.post('/user-login/login', data);
      if (result.data.code == 200) {
        const token = result.data.access_token;
        login(token);
      } else if (result.data.code == 400) {
        setErrorMessage("User not found or password didn't match");
        setValue('password', '');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      setValue('email', '');
      setValue('password', '');
    }
  };

  const googleLogin = useGoogleLogin({
    // flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const result = await axiosInstance.post(
        `/user-login/signin_google/${codeResponse.access_token}`
      );
      const accToken = result.data.data.access_token;
      login(accToken);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <div className="flex items-center h-screen justify-center">
        <div className="form p-7 rounded-xl md:w-2/5 flex flex-col justify-center items-center sm:w-full">
          <div className="absolute top-2 left-2">
            <img
              src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
              alt="logo"
              className="w-16"
            />
          </div>
          <Heading children="Welcome Back" />
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-8 sm:pr-4 py-3 rounded relative w-full mb-2"
              role="alert"
            >
              <span className="block sm:inline">
                User not found or password didn't match
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setErrorMessage('')}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Controller
              name="email"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="email"
                  label="Email"
                  className={
                    errors.email
                      ? 'w-full border-secondary-danger focus:border-secondary-danger'
                      : 'w-full'
                  }
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your email"
                >
                  Email
                </FormInput>
              )}
              rules={{
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
              }}
            />
            {errors.email?.type === 'required' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Email is required
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Please input a valid email format
              </p>
            )}
            <Controller
              name="password"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="password"
                  value={value}
                  placeholder="*******"
                  label="password"
                  name={name}
                  onChange={onChange}
                  className={
                    errors.password
                      ? 'w-full border-secondary-danger focus:border-secondary-danger'
                      : 'w-full'
                  }
                >
                  Password
                </FormInput>
              )}
              rules={{
                required: true,
              }}
            />
            {errors.password?.type === 'required' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Password is required
              </p>
            )}
            {errors.password?.type === 'pattern' && (
              <p className="w-md-[300px] -mt-5 text-right text-secondary-danger text-sm font-semibold">
                Password require minimum eight characters, at least one letter
                and one number
              </p>
            )}

            <div className="flex mb-4 gap-16 justify-between">
              <div className="checkbox-input">
                <input type="checkbox" id="check" className="mr-2" />
                <label
                  htmlFor="check"
                  className="text-left text-black text-sm font-semibold"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-black text-sm font-semibold">
                Forgot password
              </a>
            </div>
            <Button
              disabled={false}
              className="w-full"
              variant="primary"
              size="md"
              id="signin"
            >
              Sign in
            </Button>
          </form>
          <div className="mt-4 w-full">
            <Button
              className="border w-full"
              variant="secondary"
              onClick={() => {
                googleLogin();
              }}
            >
              Log in with Google
            </Button>
          </div>
        </div>
        <div className="md:w-3/5 h-screen relative bg-gradient-to-l from-transparent to-white md:block hidden">
          <img
            src="https://i.ibb.co/p04HSxH/image-1.png"
            className="object-cover mix-blend-overlay h-screen w-screen"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
