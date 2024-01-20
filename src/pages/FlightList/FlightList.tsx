import Navbar from './components/Navbar/Navbar';
import VoucherCard from './components/VoucherCard/VoucherCard';

const FlightList = () => {
  return (
    <>
      <Navbar className="fixed top-0 right-0 left-0 z-10" />
      <VoucherCard
        vouchertitle="ini voucher asik"
        voucherdescription="voucher ini dapat di tukarkan ke toko
                terdekat"
        voucherimageurl="https://i.ibb.co/xgP9hXt/1705387995965-06335942abf22232a4caa74eb239ad59.jpg"
        vouchercode="asik2000"
      />
    </>
  );
};

export default FlightList;
