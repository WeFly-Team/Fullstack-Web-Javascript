import { useContext, useEffect } from 'react';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import Heading from '../../../components/Heading';
import {
  FrogotPassContext,
  IPasswordInput,
  forgotPasswordContextType,
} from '../types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SetNewPass = () => {
  const { handleComponent } = useContext(
    FrogotPassContext
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

  const onSubmit: SubmitHandler<IPasswordInput> = (data) => {
    console.log(data);
    handleComponent('done');
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
          <Heading children="Set new Password" />
          <h2 className="text-center text-gray-500 text-sm mb-5">
            Must be at least 8 characters
          </h2>
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
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                message:
                  'Password require minimum eight characters, at least one letter,one number, and one special characters',
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
                placeholder="Comfirm your new password"
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

export default SetNewPass;
