import { useState } from 'react';
import { AlignJustify, X } from 'react-feather';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <nav className="">
      <div className="p-4">
        <div className="flex justify-between items-center bg-red-500">
          <img
            src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
            alt="logo"
            className="w-12 order-1 sm:order-2"
          />
          <AlignJustify
            className="text-gray-500 cursor-pointer order-2 sm:order-1 lg:hidden"
            onClick={() => setOpen(true)}
          />
          <div className="hidden sm:flex gap-2 items-center order-3">
            <Link to="/login" className="text-white font-semibold">
              Log In
            </Link>
            <Link
              to="/register"
              className="text-white rounded-xl border-white border-2 py-2 px-2 outline-2 hover:bg-white hover:bg-opacity-20 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div
        className={`fixed bottom-0 top-0 left-0 right-0 transition-all duration-500 lg:hidden ${
          !open
            ? '-translate-x-[100%] opacity-0'
            : 'translate-x-[0%] opacity-100'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="py-4 pl-3 flex">
              <button className="cursor-pointer" onClick={() => setOpen(false)}>
                <X className="text-white" />
              </button>
              <p className="text-white ml-3 font-semibold">Menu</p>
            </div>
            <hr className="opacity-50" />
            <ul className="mt-4">
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                Home
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                My Booking
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                About
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                Contact Us
              </li>
              <li className="text-white py-4 text-center hover:cursor-pointer transition hover:bg-white hover:bg-opacity-20">
                Profile
              </li>
            </ul>
            <div className="absolute bottom-0 pb-8 flex justify-center gap-3 w-full items-center">
              <Link to="/login" className="text-white font-semibold">
                Log In
              </Link>
              <Link
                to="/register"
                className="text-white rounded-xl border-white border-2 py-2 px-2 outline-2 hover:bg-white hover:bg-opacity-20 transition"
              >
                Sign Up
              </Link>
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
