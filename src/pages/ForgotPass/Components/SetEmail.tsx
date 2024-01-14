import { Link } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import { useContext } from 'react';
import {
  FrogotPassContext,
  IFormInput,
  forgotPasswordContextType,
} from '../types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const SetEmail = () => {
  const { handleEmail, handleComponent } = useContext(
    FrogotPassContext
  ) as forgotPasswordContextType;

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
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleEmail(data.email);
    handleComponent('otp');
  };

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
          <Heading children="Forgot Password" />
          <h2 className="text-center text-gray-500 text-sm mb-5">
            No worries, we'll send you reset instructions.
          </h2>
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
        <div className="md:w-3/5 h-screen relative bg-gradient-to-l from-transparent to-white sm:block hidden">
          <img
            src="https://i.ibb.co/p04HSxH/image-1.png"
            className=" object-cover mix-blend-overlay h-screen w-screen"
          />
        </div>
      </div>
    </>
  );
};

export default SetEmail;
