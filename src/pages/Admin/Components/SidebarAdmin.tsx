import { CiAirportSign1 } from 'react-icons/ci';
import { FaChartPie, FaFileLines, FaPlane } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className="bg-white w-64 border-r border-r-neutral-04 p-6">
      <p className="uppercase text-xs text-gray-600 font-semibold mb-4 tracking-wider">
        homes
      </p>

      <Link
        to="/admin"
        className="flex items-center mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <FaChartPie className="text-xs mr-2" />
        Report dashboard
      </Link>

      <p className="uppercase mt-4 text-xs font-semibold text-gray-600 mb-4 tracking-wider">
        master
      </p>

      <Link
        to="/admin/airport"
        className="flex items-center mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <CiAirportSign1 className="text-xs mr-2" />
        Airport
      </Link>
      <Link
        to="/admin/flight"
        className="flex items-center mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <FaPlane className="text-xs mr-2" />
        Flight
      </Link>
      <Link
        to="/admin/transaction"
        className="flex items-center mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <FaFileLines className="text-xs mr-2" />
        Transaction
      </Link>
    </div>
  );
};
export default SidebarAdmin;
