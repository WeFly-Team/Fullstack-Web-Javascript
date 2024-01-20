import CardTicket from './components/CardTicket/CardTicket';
import Detail from './components/Detail/Details';
import Navbar from './components/Navbar/Navbar';
import PriceFilter from './components/PriceFilter/PriceFilter';
import VoucherCard from './components/VoucherCard/VoucherCard';

const FlightList = () => {
  return (
    <>
      <Navbar className="fixed top-0 right-0 left-0 z-10 bg-white" />
      <div className="px-8 lg:px-0 lg:container mx-auto ">
        <div className="pt-48 flex">
          <div className="w-1/4 relative">
            <VoucherCard />
          </div>
          <div className="w-3/4">
            <Detail />
          </div>
        </div>
        <div className="flex">
          {/* filter */}
          <div className="w-1/4"></div>
          {/* card ticket */}
          <div className="w-3/4 mt-4">
            <PriceFilter />
            <CardTicket className="mt-4" />
            <CardTicket className="mt-4" />
            <CardTicket className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightList;
