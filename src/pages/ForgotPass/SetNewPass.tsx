import { ChangeEvent, useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import { Link } from 'react-router-dom';

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
          <h2 className="text-center text-gray-500 text-sm mb-5">Must be at least 8 characters</h2>
          <FormInput
            children="Password"
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={newPassword}
            placeholder="Enter your new Password"
          />
          <FormInput
            children="Password"
            type="password"
            label="Confirm password"
            name="password"
            value={confirmPassword}
            onChange={confirmNewPassword}
            placeholder="Comfirm your new password"
          />
          <Link to="/done">
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

export default SetNewPass;
