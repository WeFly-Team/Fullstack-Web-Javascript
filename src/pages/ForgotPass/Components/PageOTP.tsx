import { useContext, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import { FrogotPassContext, forgotPasswordContextType } from '../types';
import OTPInput from 'react-otp-input';

const PageOTP = () => {
  // const [email, setEmail] = useState('');
  const { email, handleComponent } = useContext(
    FrogotPassContext
  ) as forgotPasswordContextType;
  const [code, setCode] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(true);
  const [btnDisable, setBtnDisable] = useState<string>('disabled:opacity-25');

  const handleCode = (otpCode: string) => {
    setCode(otpCode);
  };

  useEffect(() => {
    if (code.length == 4) {
      setDisable(false);
      setBtnDisable('');
    } else {
      setDisable(true);
      setBtnDisable('disabled:opacity-25');
    }
  }, [code]);

  const submitOtp = () => {
    handleComponent('newPass');
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
          <Heading children="Forgot Password" />
          <h2 className="text-center text-gray-500 text-sm mb-5">
            We sent a code to <b>{email}</b>
          </h2>
          <div className="w-[250px] mb-3">
            <OTPInput
              value={code}
              onChange={handleCode}
              numInputs={4}
              inputType="tel"
              shouldAutoFocus={true}
              skipDefaultStyles={true}
              containerStyle={{ gap: '1rem' }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="shadow appearance-none border rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-blue transition w-full h-11 px-4 py-3 mb-2"
                />
              )}
            />
          </div>
          <Button
            disabled={disable}
            children="Continue"
            variant="primary"
            size="md"
            className={btnDisable}
            onClick={() => submitOtp()}
          />
          <p className="text-center text-black-500 text-sm mt-5">
            Didn't recieve the email?{' '}
            <a href="" className="font-bold">
              Click to resend
            </a>
          </p>
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

export default PageOTP;
