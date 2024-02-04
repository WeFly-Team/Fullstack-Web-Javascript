import { Link, useSearchParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axios';
import { AxiosError } from 'axios';

const RegisterSuccess = () => {
  const [searchParams] = useSearchParams();
  const [activated, setActivated] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Please Wait');
  const [message, setMessage] = useState<string>(
    'Your account activation are in progress!'
  );
  const [desc, setDesc] = useState<string>('');

  useEffect(() => {
    const confirmOtp = async (otp: string) => {
      try {
        const result = await axiosInstance.get(
          `/user-register/register-confirm-otp/${otp}`
        );
        if (result.data.code == 200) {
          setActivated(true);
          setTitle('ALL DONE!');
          setMessage('Your account has been actived!');
          setDesc('Please log in with your email and password Log In');
        }
      } catch (err) {
        setActivated(false);
        setTitle('Error!');
        setDesc('');
        if (err instanceof AxiosError) {
          setMessage(err.message);
        } else if (err instanceof Error) {
          setMessage(err.message);
        }
      }
    };
    if (searchParams) {
      const otp = searchParams.get('otp');
      if (otp) {
        confirmOtp(otp);
      } else {
        setTitle('Oops!');
        setMessage('Something went wrong!');
        setDesc('');
        setActivated(false);
      }
    }
  }, [searchParams]);
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
          <Heading children={title} />
          <h2 className="text-center text-gray-500 text-sm mb-5">{message}</h2>
          <h2 className="text-center text-gray-500 text-sm mb-5">{desc}</h2>
          {activated && (
            <Link to="/login">
              <Button children="Log In" variant="primary" size="md" />
            </Link>
          )}
          {!activated && (
            <Link to="/">
              <Button children="Go to Homepage" variant="primary" size="md" />
            </Link>
          )}
        </div>
        <div className="md:w-3/5 h-screen relative bg-gradient-to-l from-transparent to-white md:block hidden">
          <img
            src="https://i.ibb.co/p04HSxH/image-1.png"
            className=" object-cover mix-blend-overlay h-screen w-screen"
          />
        </div>
      </div>
    </>
  );
};

export default RegisterSuccess;
