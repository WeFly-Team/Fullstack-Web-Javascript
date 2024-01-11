// import { ChangeEvent, useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { IFormInput } from './types';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  // const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  //   console.log(setEmail);
  // };

  // const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  //   console.log(setPassword);
  // };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="email"
                  label="Email"
                  className={
                    errors.email
                      ? 'border-secondary-danger focus:border-secondary-danger'
                      : ''
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
                  // className="!w-full"
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
              <p className="w-[300px] -mt-5 text-right text-secondary-danger text-sm font-semibold">
                Password require minimum eight characters, at least one letter
                and one number
              </p>
            )}

            <div className="flex mb-4 gap-16">
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
            <Button variant="primary" size="md" id="signin">
              Sign in
            </Button>
          </form>
          <div className="mt-4 shadow-03">
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
                width={300}
                text="signin_with"
              />
            </GoogleOAuthProvider>
          </div>
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

export default Login;
