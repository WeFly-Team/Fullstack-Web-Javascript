import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import Select from 'react-select';
import { datesOption, monthsOption, yearsOption } from './data';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { IFormInput } from './types';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
const today = new Date();
const Register = () => {
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

  const [buttonColor, setButtonColor] = useState('grey');
  const [accept, setAccept] = useState(false);

  const HandleChecked = () => {
    setAccept(!accept);
    setButtonColor(accept ? 'grey' : 'blue');
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
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
                    render={({ field: { name, onChange } }) => (
                      <Select
                        name={name}
                        value={datesOption[0]}
                        id="day"
                        styles={{
                          indicatorSeparator: () => ({ display: 'none' }),
                        }}
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
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
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

            <div className="flex mb-4">
              <input
                type="checkbox"
                id="check"
                className="mr-2"
                onClick={HandleChecked}
              />
              <label
                htmlFor="check"
                className="text-left text-black text-sm font-semibold"
              >
                Saya Menyetujui Syarat & Ketentuan
              </label>
            </div>

            <Button
              disabled={!accept}
              style={{ backgroundColor: buttonColor }}
              className="w-full disabled"
              size="md"
              id="signup"
            >
              Sign Up
            </Button>
          </form>
          <div className="mt-4 shadow-03 w-full">
            <GoogleOAuthProvider clientId="785790667634-1r362pmk4q48l0j2i0vcl3v6nfesn60m.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                shape="rectangular"
                size="large"
                width={400}
                text="signup_with"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
