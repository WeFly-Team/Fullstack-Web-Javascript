import { useContext, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import Heading from '../../../components/Heading';
import {
  ForgotPassContext,
  IPasswordInput,
  forgotPasswordContextType,
} from '../types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axios/axios';
import { AxiosError } from 'axios';

const SetNewPass = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { handleComponent, otpCode, email } = useContext(
    ForgotPassContext
  ) as forgotPasswordContextType;
  // useForm
  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IPasswordInput>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'password' || name === 'confirmPassword') {
        if (value.password !== value.confirmPassword) {
          if (!errors.confirmPassword) {
            setError('confirmPassword', {
              type: 'unmatch',
              message: 'Password does not match',
            });
          }
        } else if (value.password === value.confirmPassword) {
          clearErrors(['confirmPassword']);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<IPasswordInput> = async (data) => {
    try {
      const result = await axiosInstance.put(
        '/forget-password/change-password',
        {
          email: email,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
          otp: otpCode,
        }
      );
      if (result.data.code == 200) {
        handleComponent('done');
      } else if (result.data.code == 400) {
        setErrorMessage(result.data.error);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data && err.response?.data.code == 400) {
          setErrorMessage(err.response.data.error);
        } else if (err.response?.data && err.response?.data.code == 200) {
          handleComponent('done');
        } else setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="form p-7 rounded-xl md:w-2/5 flex flex-col justify-center items-center sm:w-full">
      <div className="absolute top-2 left-2">
        <img
          src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
          alt="logo"
          className="w-16"
        />
      </div>
      <Heading children="Set new Password" />
      <h2 className="text-center text-gray-500 text-sm mb-5">
        Must be at least 8 characters
      </h2>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-8 sm:pr-4 py-3 rounded relative w-[300px] mb-2"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
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
      <Controller
        name="password"
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <FormInput
            children="Password"
            type="password"
            label="Password"
            name={name}
            value={value}
            onChange={onChange}
            placeholder="Enter your new Password"
            className={
              errors.password &&
              'border-secondary-danger focus:border-secondary-danger '
            }
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
            message:
              'Password require minimum eight characters, at least one uppercase and one number',
          },
        }}
      />
      {errors.password && (
        <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold w-[300px]">
          {errors.password.message}
        </p>
      )}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { value, name, onChange } }) => (
          <FormInput
            children="Confirm Password"
            type="password"
            label="Confirm password"
            name={name}
            value={value}
            onChange={onChange}
            placeholder="Confirm your new password"
            className={
              errors.confirmPassword &&
              'border-secondary-danger focus:border-secondary-danger '
            }
          />
        )}
      />
      {errors.confirmPassword && (
        <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold  w-[300px]">
          {errors.confirmPassword.message}
        </p>
      )}
      <Button
        children="Reset Password"
        variant="primary"
        size="md"
        onClick={handleSubmit(onSubmit)}
      />
      <Link to="/login" className="text-center text-black-500 text-sm mt-5">
        ← Back to Login
      </Link>
    </div>
  );
};

export default SetNewPass;
