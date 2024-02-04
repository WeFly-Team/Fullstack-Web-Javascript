import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import { Link } from 'react-router-dom';

const DonePage = () => {
  return (
    <div className="form p-7 rounded-xl md:w-2/5 flex flex-col justify-center items-center sm:w-full">
      <div className="absolute top-2 left-2">
        <img
          src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
          alt="logo"
          className="w-16"
        />
      </div>
      <Heading children="All Done!" />
      <h2 className="text-center text-gray-500 text-sm mb-5">
        Your password has been reset.
      </h2>
      <h2 className="text-center text-gray-500 text-sm mb-5">
        Please log in with your email or phone number and new password
      </h2>
      <Link to="/login">
        <Button children="Log In" variant="primary" size="md" />
      </Link>
    </div>
  );
};

export default DonePage;
