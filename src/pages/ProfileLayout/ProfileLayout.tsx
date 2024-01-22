import { Link, Outlet } from 'react-router-dom';
import Navbar from '../FlightList/components/Navbar/Navbar';
import { TbReport, TbReportAnalytics } from 'react-icons/tb';
import { FaBell, FaGear } from 'react-icons/fa6';
import { GrPowerShutdown } from 'react-icons/gr';
import { IoMailSharp } from 'react-icons/io5';
import Footer from '../Homepage/components/Footer/Footer';

const ProfileLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="lg:container mx-auto flex mt-6">
        <div className="basis-1/4">
          <div className="rounded-lg border border-neutral-05">
            <div className="profile-menu p-4 border-b border-neutral-05">
              <div className="flex items-center gap-5">
                <div className="rounded-full bg-blue-50 h-12 w-12 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center">
                  VM
                </div>
                <div className="font-semibold">Vincent Marko</div>
              </div>
            </div>
            <div className="pt-3">
              <Link
                to="/user/my-booking"
                className="flex items-center bg-primary-darkBlue px-5 py-2 "
              >
                <TbReport className="text-white text-2xl mr-3" />
                <p className="text-white font-semibold">My Booking</p>
              </Link>
              <Link
                to="/user/history"
                className="flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white"
              >
                <TbReportAnalytics className="text-inherit text-2xl mr-3" />
                <p className="text-inherit font-semibold">History</p>
              </Link>
              <Link
                to="/user/notification"
                className="flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white "
              >
                <FaBell className="text-inherit text-2xl mr-3" />
                <p className="text-inherit font-semibold">Notification</p>
              </Link>
              <Link
                to="/user/promos"
                className="flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white "
              >
                <IoMailSharp className="text-inherit text-2xl mr-3" />
                <p className="text-inherit font-semibold">Promo Info</p>
              </Link>
              <div className="px-4">
                <hr className="border-neutral-05" />
              </div>
              <Link
                to="/user/my-account"
                className="flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white "
              >
                <FaGear className="text-inherit text-2xl mr-3" />
                <p className="text-inherit font-semibold">My Account</p>
              </Link>
              <div className="flex items-center px-5 py-2 text-primary-darkBlue hover:bg-primary-blue hover:text-white">
                <GrPowerShutdown className="text-inherit text-2xl mr-3" />
                <p className="text-inherit font-semibold">Log Out</p>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-3/4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
