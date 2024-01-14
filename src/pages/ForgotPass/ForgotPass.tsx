import { useState } from 'react';
import SetEmail from './Components/SetEmail';
import { FrogotPassContext } from './types';
import PageOTP from './Components/PageOTP';
import SetNewPass from './Components/SetNewPass';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const handleEmail = (email: string) => {
    setEmail(email);
    console.log(email);
  };

  const handleComponent = (comp: string) => {
    if (comp === 'otp') {
      setComponent(<PageOTP />);
    } else if (comp === 'newPass') {
      setComponent(<SetNewPass />);
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
