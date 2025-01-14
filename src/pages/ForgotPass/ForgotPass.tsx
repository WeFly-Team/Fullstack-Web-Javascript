import { useState } from 'react';
import DonePage from './Components/DonePage';
import PageOTP from './Components/PageOTP';
import SetEmail from './Components/SetEmail';
import SetNewPass from './Components/SetNewPass';
import { ForgotPassContext } from './types';

const ForgotPass = () => {
  const [email, setEmail] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const handleOtpCode = (otp: string) => {
    setOtpCode(otp);
  };

  const handleComponent = (comp: string) => {
    if (comp === 'otp') {
      setComponent(<PageOTP />);
    } else if (comp === 'newPass') {
      setComponent(<SetNewPass />);
    } else if (comp === 'done') {
      setComponent(<DonePage />);
    }
  };

  const [component, setComponent] = useState<React.JSX.Element>(<SetEmail />);

  return (
    <ForgotPassContext.Provider
      value={{ email, otpCode, handleOtpCode, handleEmail, handleComponent }}
    >
      <>
        <div className="flex items-center h-screen justify-center">
          {component}
          <div className="md:w-3/5 h-screen relative bg-gradient-to-l from-transparent to-white md:block hidden">
            <img
              src="https://res.cloudinary.com/dwy823csd/image/upload/v1736875948/hero.png"
              className=" object-cover mix-blend-overlay h-screen w-screen"
            />
          </div>
        </div>
      </>
    </ForgotPassContext.Provider>
  );
};

export default ForgotPass;
