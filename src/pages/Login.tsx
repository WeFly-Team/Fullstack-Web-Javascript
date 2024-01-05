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
      <div className="flex items-center h-screen">
        <div className="form p-7 rounded-xl w-[40%] flex flex-col justify-center items-center">
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
        <div className="w-[60%] h-screen relative bg-gradient-to-l from-transparent to-white ">
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
