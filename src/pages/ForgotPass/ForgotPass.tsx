import { ChangeEvent, useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  //   const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(setEmail);
  };
  //   const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
  //     setPassword(e.target.value);
  //     console.log(setPassword);
  //   };

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
            No worries, we’ll send you reset instructions.</h2>
          <FormInput
            children="Email"
            type="email"
            label="Email/Phone Number"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="Enter your email or Phone Number"
          />
          <Link to="/otp">
            <Button children="Reset Password" variant='primary' size='md' />
          </Link>
          <a href='/login' className="text-center text-black-500 text-sm mt-5">← Back to Login</a>
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

export default ForgotPass;
