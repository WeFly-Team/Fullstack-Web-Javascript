import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../FlightList/components/Navbar/Navbar';
import { TbReport, TbReportAnalytics } from 'react-icons/tb';
import { FaBell, FaGear } from 'react-icons/fa6';
import { GrPowerShutdown } from 'react-icons/gr';
import { IoMailSharp } from 'react-icons/io5';
import Footer from '../Homepage/components/Footer/Footer';
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../../customHooks/useAuth/useAuth';
import { getInitials, triggerToast } from '../../utils/functions';
import { ToastContainer } from 'react-toastify';
import { UserProfileContextType } from './types';
import { useEffect, useState } from 'react';
import { User } from '../MyAccount/types';
import axiosInstance from '../../axios/axios';
import { AxiosError } from 'axios';

const ProfileLayout = () => {
  const [user, setUser] = useState<User>();
  const { logout } = useAuth();
  const handleLogout = () => {
    googleLogout();
    logout();
  };

  const handleUpdateUser = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axiosInstance.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(result.data.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.data && err.response?.data.code == 400) {
            triggerToast('error', err.response.data.error);
          } else {
            triggerToast('error', err.message);
          }
        } else if (err instanceof Error) {
          triggerToast('error', err.message);
        }
      }
    };
    getUser();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="lg:container sm:mx-auto flex mt-6 mb-6">
          <div className="hidden lg:block basis-1/4">
            <div className="rounded-lg border border-neutral-05 shadow-card">
              <div className="profile-menu p-4 border-b border-neutral-05">
                <div className="flex items-center gap-5">
                  <div className="rounded-full bg-blue-50 h-12 w-12 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center">
                    {user && getInitials(user.fullName)}
                  </div>
                  <div className="font-semibold">{user && user.fullName}</div>
                </div>
              </div>
              <div className="pt-3">
                <NavLink
                  to="/user/my-booking"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-2 bg-primary-darkBlue text-white'
                      : 'flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white'
                  }
                >
                  <TbReport className="text-inherit text-2xl mr-3" />
                  <p className="text-inherit font-semibold">My Booking</p>
                </NavLink>
                <NavLink
                  to="/user/history"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-2 bg-primary-darkBlue text-white'
                      : 'flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white'
                  }
                >
                  <TbReportAnalytics className="text-inherit text-2xl mr-3" />
                  <p className="text-inherit font-semibold">History</p>
                </NavLink>
                <NavLink
                  to="/user/notification"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-2 bg-primary-darkBlue text-white'
                      : 'flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white'
                  }
                >
                  <FaBell className="text-inherit text-2xl mr-3" />
                  <p className="text-inherit font-semibold">Notification</p>
                </NavLink>
                <NavLink
                  to="/user/promos"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-2 bg-primary-darkBlue text-white'
                      : 'flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white'
                  }
                >
                  <IoMailSharp className="text-inherit text-2xl mr-3" />
                  <p className="text-inherit font-semibold">Promo Info</p>
                </NavLink>
                <div className="px-4 py-3">
                  <hr className="border-neutral-05" />
                </div>
                <NavLink
                  to="/user/my-account"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-2 bg-primary-darkBlue text-white'
                      : 'flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white'
                  }
                >
                  <FaGear className="text-inherit text-2xl mr-3" />
                  <p className="text-inherit font-semibold">My Account</p>
                </NavLink>
                <div
                  className="flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  <GrPowerShutdown className="text-inherit text-2xl mr-3" />
                  <p className="text-inherit font-semibold">Log Out</p>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full lg:basis-3/4 px-5 mx-auto">
            <UserProfileContextType.Provider value={{ user, handleUpdateUser }}>
              <Outlet />
            </UserProfileContextType.Provider>
          </div>
        </div>
        <Footer className="!pt-0" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileLayout;
