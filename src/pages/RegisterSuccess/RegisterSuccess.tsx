import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';
import Button from '../../components/Button';

const RegisterSuccess = () => {
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
          <Heading children="All Done!" />
          <h2 className="text-center text-gray-500 text-sm mb-5">
            Your account has been actived!.
          </h2>
          <h2 className="text-center text-gray-500 text-sm mb-5">
            Please log in with your email and password
          </h2>
          <Link to="/login">
            <Button children="Log In" variant="primary" size="md" />
          </Link>
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
