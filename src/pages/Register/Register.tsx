import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import Select from 'react-select';
import { datesOption, monthsOption, yearsOption } from './data';
import { useGoogleLogin } from '@react-oauth/google';
import { IFormInput } from './types';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import axiosInstance from '../../axios/axios';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../customHooks/useAuth/useAuth';

const today = new Date();
const Register = () => {
  // useAuth
  const { login } = useAuth();
  // useState
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  // hook form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      fullname: '',
      phoneNumber: '',
      password: '',
    },
  });

  const resetValue = () => {
    setValue('email', '');
    setValue('password', '');
    setValue('phoneNumber', '');
    setValue('password', '');
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await axiosInstance.post('/user-register/register-user', {
        ...data,
        fullName: data.fullname,
        day: data.day.value,
        month: data.month.value,
        year: data.year.value,
      });
      if (result.data.code == 200) {
        setSuccessMessage(result.data.data);
        resetValue();
      } else if (result.data.code == 400) {
        setErrorMessage(result.data.error);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      resetValue();
    }
  };

  const googleSignUp = useGoogleLogin({
    // flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const result = await axiosInstance.post(
        `/user-login/signin_google/${codeResponse.access_token}`
      );
      const signupToken = result.data.data.access_token;
      login(signupToken);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // function
  const getAllDatesInMonth = (year: number, month: string): void => {
    const monthConverted =
      new Date(Date.parse(month + ' 1, 2012')).getMonth() + 1;
    const endDate = new Date(year, monthConverted, 0).getDate();

    datesOption.length = 0;
    for (let i = 1; i <= endDate; i++) {
      datesOption.push({ value: String(i), label: String(i) });
    }
  };
  // effect
  useEffect(() => {
    setValue('year', {
      value: today.getFullYear(),
      label: today.getFullYear(),
    });
    setValue('month', {
      value: monthsOption[today.getMonth()].value,
      label: monthsOption[today.getMonth()].value,
    });

    getAllDatesInMonth(
      today.getFullYear(),
      monthsOption[today.getMonth()].value
    );

    setValue('day', { label: '1', value: '1' });
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'month' || name === 'year') {
        if (value.year?.value && value.month?.value) {
          getAllDatesInMonth(value.year?.value, value.month?.value);
          setValue('day', { label: '1', value: '1' });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="h-dvh">
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7">
        <div className="bg-gradient-to-r from-transparent to-white hidden md:block md:col-span-1 lg:col-span-3 xl:col-span-4 xxl:col-span-5">
          <img
            src="https://i.ibb.co/p04HSxH/image-1.png"
            alt="plane-register"
            className="object-cover mix-blend-overlay h-screen w-screen"
          />
        </div>
        <div className="relative col-span-2 w-full h-screen flex flex-col justify-center px-10 md:col-span-1 lg:col-span-2 xl:col-span-2 xxl:col-span-2">
          <div className="absolute left-2 top-2 md:right-2 md:left-auto">
            <img
              src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
              alt="logo"
              className="w-16"
            />
          </div>
          <div className="mx-auto md:mx-0">
            <Heading>REGISTER NOW!</Heading>
          </div>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-8 sm:pr-4 py-3 rounded relative w-full mb-2"
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
          {successMessage && (
            <div
              className="bg-blue-100 border border-blue-400 text-blue-700 pl-4 pr-8 sm:pr-4 py-3 rounded relative w-full mb-2"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setSuccessMessage('')}
              >
                <svg
                  className="fill-current h-6 w-6 text-blue-500"
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  placeholder="example@gmail.com"
                  label="email"
                  className={
                    errors.email
                      ? 'border-secondary-danger focus:border-secondary-danger w-full'
                      : 'w-full'
                  }
                  value={value}
                  name={name}
                  onChange={onChange}
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
              name="fullname"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  value={value}
                  placeholder="Enter your full name"
                  label="fullname"
                  name={name}
                  onChange={onChange}
                  className={
                    errors.fullname
                      ? 'border-secondary-danger focus:border-secondary-danger w-full'
                      : 'w-full'
                  }
                >
                  Full Name
                </FormInput>
              )}
              rules={{ required: true }}
            />
            {errors.fullname?.type === 'required' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Full Name is required
              </p>
            )}
            <div className="mb-4">
              <label
                htmlFor="Date of Birth"
                className="block text-left text-black text-sm font-semibold pb-3"
              >
                Date of Birth
              </label>
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <Controller
                    name="day"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        name={name}
                        id="day"
                        styles={{
                          indicatorSeparator: () => ({ display: 'none' }),
                        }}
                        value={value}
                        options={datesOption}
                        onChange={onChange}
                        classNames={{
                          control: (state) =>
                            state.isFocused
                              ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                              : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                        }}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.day?.type === 'required' && (
                    <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                      Date is required
                    </p>
                  )}
                </div>

                <div className="col-span-1 xl:col-span-2">
                  <Controller
                    name="month"
                    control={control}
                    render={({ field: { name, onChange } }) => (
                      <Select
                        name={name}
                        id="month"
                        defaultValue={monthsOption[today.getMonth()]}
                        options={monthsOption}
                        onChange={onChange}
                        styles={{
                          indicatorSeparator: () => ({ display: 'none' }),
                        }}
                        classNames={{
                          control: (state) =>
                            state.isFocused
                              ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                              : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Controller
                    name="year"
                    control={control}
                    render={({ field: { name, onChange } }) => (
                      <Select
                        name={name}
                        id="year"
                        defaultValue={yearsOption[0]}
                        options={yearsOption}
                        onChange={onChange}
                        styles={{
                          indicatorSeparator: () => ({ display: 'none' }),
                        }}
                        classNames={{
                          control: (state) =>
                            state.isFocused
                              ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                              : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  value={value}
                  placeholder="081234567890"
                  label="phoneNumber"
                  name={name}
                  onChange={onChange}
                  className={
                    errors.phoneNumber
                      ? 'border-secondary-danger focus:border-secondary-danger w-full'
                      : 'w-full'
                  }
                >
                  Phone Number
                </FormInput>
              )}
              rules={{
                required: true,
                pattern: /^(\+62|62|0)8[1-9][0-9]{6,9}$/i,
              }}
            />
            {errors.phoneNumber?.type === 'required' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Phone Number is required
              </p>
            )}
            {errors.phoneNumber?.type === 'pattern' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Invalid phone number
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
                      ? 'border-secondary-danger focus:border-secondary-danger w-full'
                      : 'w-full'
                  }
                >
                  Password
                </FormInput>
              )}
              rules={{
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
              }}
            />
            {errors.password?.type === 'required' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Password is required
              </p>
            )}
            {errors.password?.type === 'pattern' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Password require minimum eight characters, at least one letter
                and one number
              </p>
            )}

            <Button className="w-full" size="md" id="signup">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 w-full">
            <Button
              className="border w-full flex justify-center p-2"
              variant="secondary"
              onClick={() => {
                googleSignUp();
              }}
            >
              <img
                src="https://i.ibb.co/VjNmDct/free-icon-google-300221-1.png"
                alt="google_logo"
                className="mr-4 w-6 h-6"
              />
              Sign up with Google
            </Button>
          </div>
          <label className="mt-4 mx-auto">
            Already have account? &nbsp;
            <Link to="/login" className="font-semibold text-primary-darkBlue">
              Sign In
            </Link>
          </label>
          <label className="mt-5 text-center">
            By registering, you agree to our {''}
            <span className="underline">Terms & Conditions</span>
            {''} and that you have read our {''}
            <span className="underline">Privacy Notice.</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Register;
