import { ChangeEvent, useState } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Heading from '../components/Heading';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(setEmail);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(setPassword);
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
          <Heading children="Welcome Back" />
          <FormInput
            children="Email"
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="Enter your email"
          />
          <FormInput
            children="Password"
            type="password"
            label="Password"
            name="Password"
            value={password}
            onChange={handlePassword}
            placeholder="**********"
          />
          <Button children="Sign in" />
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
