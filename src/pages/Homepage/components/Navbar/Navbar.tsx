import { HTMLAttributes, useEffect, useState } from 'react';
import { AlignJustify, User, X } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../customHooks/useAuth/useAuth';
import { googleLogout } from '@react-oauth/google';

const Navbar = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [bgNavbar, setBgNavbar] = useState<string>('');

  const { user, logout } = useAuth();

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      return setBgNavbar('bg-[#1c2c43]');
    }
    return setBgNavbar('');
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  return (
    <nav {...props}>
      <div className={`${bgNavbar} transition`}>
        <div className="lg:container mx-auto p-4 ">
          <div className="flex justify-between items-center">
            <Link to="/" className="order-1 sm:order-2">
              <img
                src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
                alt="logo"
                className="w-12 "
              />
            </Link>
            <AlignJustify
              className="text-white cursor-pointer order-2 sm:order-1 lg:hidden"
              onClick={() => setOpen(!open)}
            />
            <div className="hidden md:flex gap-2 items-center order-3">
              <div className="hidden lg:flex items-center gap-3">
                <img src="https://i.ibb.co/cD6nyQg/fb.png" alt="facebook" />
                <img
                  src="https://i.ibb.co/3sY3SBY/linkedin.png"
                  alt="linkedin"
                />
                <img src="https://i.ibb.co/p0yHtCF/twitter.png" alt="twitter" />
              </div>
              <span className="text-white text-opacity-50 mx-5 hidden lg:inline">
                |
              </span>
              {!user && (
                <Link to="/login" className="text-white font-semibold text-sm">
                  Log In
                </Link>
              )}
              {!user && (
                <Link
                  to="/register"
                  className="text-white text-sm rounded-full border-white border-2 py-1 px-2 outline-2 hover:bg-white hover:bg-opacity-20 transition"
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
              <span className="text-white text-opacity-50 mx-5 hidden lg:inline">
                |
              </span>
              <Link
                to="/user/my-account"
                className="hidden lg:flex items-center text-white text-sm"
              >
                <User className="mr-2" />
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="hidden lg:block w-full lg:container mx-auto pt-2">
        <ul className="flex justify-end gap-7">
          <li className="text-white font-semibold">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white font-semibold">
            <Link to="/user/my-booking">My Booking</Link>
          </li>
          <li className="text-white font-semibold">
            <Link to="/checkin">Check In</Link>
          </li>
          <li className="text-white font-semibold">Contact Us</li>
        </ul>
      </div>
      <div
        className={`fixed bottom-0 top-0 left-0 right-0 transition-all duration-500 lg:hidden ${
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
                <Link to="/checkin">Check In</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                Contact Us
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <Link to="/user/my-account">Profile</Link>
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                <div className="flex items-center justify-center gap-3">
                  <img src="https://i.ibb.co/cD6nyQg/fb.png" alt="facebook" />
                  <img
                    src="https://i.ibb.co/3sY3SBY/linkedin.png"
                    alt="linkedin"
                  />
                  <img
                    src="https://i.ibb.co/p0yHtCF/twitter.png"
                    alt="twitter"
                  />
                </div>
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
