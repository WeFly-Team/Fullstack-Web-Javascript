import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axios/axios';
import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import { ForgotPassContext, forgotPasswordContextType } from '../types';

const PageOTP = () => {
  //state
  const [errorMessage, setErrorMessage] = useState<string>('');
  // context
  const { email, handleComponent, handleOtpCode } = useContext(
    ForgotPassContext
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

  const submitOtp = async () => {
    try {
      const result = await axiosInstance.post(
        `/forget-password/check-token/${code}`
      );
      if (result.data.code == 200) {
        handleOtpCode(code);
        handleComponent('newPass');
      } else if (result.data.code == 400) {
        setErrorMessage(result.data.error);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data && err.response?.data.code == 400) {
          setErrorMessage(err.response.data.error);
        } else setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };
  return (
    <div className="form p-7 rounded-xl md:w-2/5 flex flex-col justify-center items-center sm:w-full">
      <div className="absolute top-2 left-2">
        <img
          src="https://res.cloudinary.com/dwy823csd/image/upload/v1736875590/icon.png"
          alt="logo"
          className="w-16"
        />
      </div>
      <Heading children="Forgot Password" className={'text-center'} />
      <h2 className="text-center text-gray-500 text-sm mb-5">
        We sent a code to <b>{email}</b>
      </h2>
      <div className="w-[250px] mb-3">
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
      <Link to="/login" className="text-center text-black-500 text-sm mt-5">
        ← Back to Login
      </Link>
    </div>
  );
};

export default PageOTP;
