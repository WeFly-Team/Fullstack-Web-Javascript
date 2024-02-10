import { HTMLAttributes, useState } from 'react';
import { AlignJustify, User, X } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../customHooks/useAuth/useAuth';
import { googleLogout } from '@react-oauth/google';

const Navbar = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [open, setOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <nav {...props}>
      <div className="lg:container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex order-1 sm:order-2 items-center ml-3">
            <img
              src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
              alt="logo"
              className="w-12 "
            />
            <h1 className="hidden md:block text-primary-darkBlue">WeFly</h1>
          </Link>
          <AlignJustify
            className="cursor-pointer order-2 sm:order-1 lg:hidden text-primary-darkBlue"
            onClick={() => setOpen(!open)}
          />
          <div className="hidden md:flex gap-2 items-center order-3">
            <div className="hidden lg:flex items-center gap-3 primary">
              <img
                src="https://i.ibb.co/gWFLCyG/blue-facebook.png"
                alt="facebook"
              />
              <img
                src="https://i.ibb.co/qd3DHmf/blue-linkedin.png"
                alt="linkedin"
              />
              <img
                src="https://i.ibb.co/rGR64GZ/blue-twitter.png"
                alt="twitter"
              />
            </div>
            <span className="text-opacity-50 mx-5 hidden lg:inline text-primary-darkBlue">
              |
            </span>
            {!user && (
              <Link
                to="/login"
                className="font-semibold text-sm text-primary-darkBlue"
              >
                Log In
              </Link>
            )}
            {!user && (
              <Link
                to="/register"
                className="text-primary-darkBlue text-sm rounded-full border-primary-darkBlue border-2 py-1 px-2 outline-2 hover:bg-primary-darkBlue hover:bg-opacity-20 transition"
              >
                Sign Up
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="text-primary-darkBlue rounded-full border-primary-darkBlue border-2 py-1 px-2 outline-2 hover:bg-primary-darkBlue hover:bg-opacity-20 transition"
              >
                Log Out
              </button>
            )}
            <span className="text-primary-darkBlue text-opacity-50 mx-5 hidden lg:inline">
              |
            </span>
            <Link
              to="/user/my-account"
              className="hidden lg:flex items-center text-primary-darkBlue text-sm"
            >
              <User className="mr-2" />
              Profile
            </Link>
          </div>
        </div>{' '}
        {/* */}
      </div>
      <hr />
      <div className="hidden lg:block w-full  pt-4 bg-neutral-03 p-4 shadow-md">
        <ul className="flex justify-end gap-7 lg:container mx-auto px-4">
          <li className="text-primary-darkBlue font-semibold">
            <Link to="/">Home</Link>
          </li>
          <li className="text-primary-darkBlue font-semibold">
            <Link to="/user/my-booking">My Booking</Link>
          </li>
          <li className="text-primary-darkBlue font-semibold">
            <Link to="/checkin">Check In</Link>
          </li>
          <li className="text-primary-darkBlue font-semibold">Contact Us</li>
        </ul>
      </div>
      <div
        className={`fixed bottom-0 top-0 left-0 right-0 transition-all duration-500 z-20 lg:hidden ${
          !open
            ? '-translate-x-[100%] opacity-0'
            : 'translate-x-[0%] opacity-100'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="py-4 pl-3 flex border-b border-white border-opacity-50">
              <button className="cursor-pointer" onClick={() => setOpen(!open)}>
                <X className="text-white" />
              </button>
              <p className="text-white ml-3 font-semibold">Menu</p>
            </div>
            <ul className="mt-4">
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/">Home</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/user/my-booking">My Booking</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/user/history">History</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/user/notification">Notification</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/user/promos">Promo Info</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/checkin">Check In</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/user/my-account">Profile</Link>
              </li>
            </ul>
            <div className="absolute bottom-0 pb-8 flex justify-center gap-3 w-full items-center">
              {!user && (
                <Link to="/login" className="text-white font-semibold">
                  Log In
                </Link>
              )}
              {!user && (
                <Link
                  to="/register"
                  className="text-white rounded-full border-white border-2 py-1 px-2 outline-2 hover:bg-white hover:bg-opacity-20 transition"
                >
                  Sign Up
                </Link>
              )}
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-white rounded-full border-white border-2 py-1 px-2 outline-2 hover:bg-white hover:bg-opacity-20 transition"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
          <img
            src="https://i.ibb.co/p04HSxH/image-1.png"
            className="object-cover h-screen w-screen "
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
