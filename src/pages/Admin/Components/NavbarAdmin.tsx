import { FaAngleDown } from 'react-icons/fa6';
import Button from '../../../components/Button';
import { useState } from 'react';
import { useAuth } from '../../../customHooks/useAuth/useAuth';
const NavbarAdmin = () => {
  const { logout } = useAuth();
  const [showAdminDropDown, setShowAdminDropDown] = useState<boolean>(false);

  return (
    <nav className="flex items-center border-b border-b-neutral-04 px-6 py-5">
      <div className="flex items-center">
        <img
          src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
          alt="logo"
          className="w-12 mr-2"
        />
        <p className="font-bold">We Fly</p>
      </div>
      <div className="ml-auto">
        <div className="w-[300px]">
          <Button
            className="bg-transparent border-neutral-03 border text-sm px-5 py-2.5 text-black text-center inline-flex items-center w-full"
            onClick={() => setShowAdminDropDown(!showAdminDropDown)}
          >
            Admin
            <FaAngleDown
              className={`ml-auto transition-transform ${
                showAdminDropDown ? 'rotate-180' : ''
              }`}
            />
          </Button>
          <div className="relative w-full">
            <div
              className={`z-10 bg-white rounded-lg shadow absolute top-2 right-0 left-0 w-full  ${
                showAdminDropDown ? 'max-h-[400px]' : 'max-h-0 overflow-hidden'
              }`}
            >
              <div className="">
                <button
                  className="w-full text-left p-3 rounded-lg hover:text-teal-600 hover:bg-teal-100 transition ease-in-out duration-500"
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
