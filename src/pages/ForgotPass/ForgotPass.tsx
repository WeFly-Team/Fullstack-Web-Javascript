import { useState } from 'react';
import SetEmail from './Components/SetEmail';
import { FrogotPassContext } from './types';
import PageOTP from './Components/PageOTP';
import SetNewPass from './Components/SetNewPass';
import DonePage from './Components/DonePage';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const handleEmail = (email: string) => {
    setEmail(email);
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
    <FrogotPassContext.Provider value={{ email, handleEmail, handleComponent }}>
      {component}
    </FrogotPassContext.Provider>
  );
};

export default ForgotPass;
