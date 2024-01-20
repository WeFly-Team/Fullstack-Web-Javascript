import Navbar from './components/Navbar/Navbar';
import VoucherCard from './components/VoucherCard/VoucherCard';

const FlightList = () => {
  return (
    <>
      <Navbar className="fixed top-0 right-0 left-0 z-10" />
      <VoucherCard />
    </>
  );
};

export default FlightList;
