import { useState } from 'react';
import SetEmail from './Components/SetEmail';
import { FrogotPassContext } from './types';
import PageOTP from './Components/PageOTP';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const handleEmail = (email: string) => {
    setEmail(email);
    console.log(email);
  };

  const handleComponent = (comp: string) => {
    if (comp === 'otp') {
      setComponent(<PageOTP />);
    }
  };

  const [component, setComponent] = useState<React.JSX.Element>(<SetEmail />);

  return (
    <FrogotPassContext.Provider value={{ email, handleEmail, handleComponent }}>
      {component}
    </FrogotPassContext.Provider>
  );
};

export default ForgotPass;
