import { ChangeEvent, useState } from 'react';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import Heading from '../../../components/Heading';
import { IPasswordInput } from '../types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const SetNewPass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const newPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(setPassword);
  };

  const confirmNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    console.log(setConfirmPassword);
  };

  // useForm
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPasswordInput>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IPasswordInput> = (data) => {
    console.log(data);
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
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
            }}
          />
          {errors.password?.type === 'required' && (
            <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold w-[300px]">
              Password is required
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold w-[300px]">
              Password require minimum eight characters, at least one letter,
              one number, and one special characters
            </p>
          )}
          <FormInput
            children="Password"
            type="password"
            label="Confirm password"
            name="password"
            value={confirmPassword}
            onChange={confirmNewPassword}
            placeholder="Comfirm your new password"
          />
          <Button
            children="Reset Password"
            variant="primary"
            size="md"
            onClick={handleSubmit(onSubmit)}
          />
          <a href="/login" className="text-center text-black-500 text-sm mt-5">
            ← Back to Login
          </a>
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
