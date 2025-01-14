import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Heading from '../../components/Heading';

const NotFound = () => {
  return (
    <>
      <div className="flex items-center h-screen justify-center">
        <div className="form p-7 rounded-xl md:w-2/5 flex flex-col justify-center items-center sm:w-full">
          <div className="absolute top-2 left-2">
            <img
              src="https://res.cloudinary.com/dwy823csd/image/upload/v1736875590/icon.png"
              alt="logo"
              className="w-16"
            />
          </div>
          <Heading children="Oops!" />
          <h2 className="text-center text-gray-500 text-sm mb-5">
            Page Not Found!
          </h2>
          <Link to="/">
            <Button children="Go to Homepage" variant="primary" size="md" />
          </Link>
        </div>
        <div className="md:w-3/5 h-screen relative bg-gradient-to-l from-transparent to-white md:block hidden">
          <img
            src="https://res.cloudinary.com/dwy823csd/image/upload/v1736875948/hero.png"
            className=" object-cover mix-blend-overlay h-screen w-screen"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
