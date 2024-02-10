import { Link } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import { useContext, useState } from 'react';
import {
  ForgotPassContext,
  IFormInput,
  forgotPasswordContextType,
} from '../types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axiosInstance from '../../../axios/axios';
import { AxiosError } from 'axios';

const SetEmail = () => {
  const { handleEmail, handleComponent } = useContext(
    ForgotPassContext
  ) as forgotPasswordContextType;
  // useState
  const [errorMessage, setErrorMessage] = useState<string>('');
  // useForm
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await axiosInstance.post(
        '/forget-password/forgot-password',
        data
      );
      if (result.data.code == 200 && result.data.message === 'success') {
        handleEmail(data.email);
        handleComponent('otp');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage(err.message);
        }
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
      <Heading children="Forgot Password" />
      <h2 className="text-center text-gray-500 text-sm mb-5">
        No worries, we'll send you reset instructions.
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
        name="email"
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <FormInput
            children="Email"
            type="email"
            name={name}
            label="Email"
            value={value}
            onChange={onChange}
            placeholder="Enter your email"
            className={
              errors.email &&
              'border-secondary-danger focus:border-secondary-danger'
            }
          />
        )}
        rules={{
          required: true,
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        }}
      />
      {errors.email?.type === 'required' && (
        <p className="w-[300px] -mt-5 mb-3 text-right text-secondary-danger text-sm font-semibold">
          Email is required
        </p>
      )}
      {errors.email?.type === 'pattern' && (
        <p className="w-[300px] -mt-5 mb-3 text-right text-secondary-danger text-sm font-semibold">
          Please input a valid email format
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

export default SetEmail;
