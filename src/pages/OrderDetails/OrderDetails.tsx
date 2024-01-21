import Navbar from '../FlightList/components/Navbar/Navbar';
import Orderer from './Components/Orderer';
import PassengerCard from './Components/PassengerCard';
import PriceDetail from './Components/PriceDetail';

const OrderDetails = () => {
  return (
    <section>
      <Navbar />
      <div className="lg:container px-4 pt-8 mx-auto">
        <h1 className="font-semibold">Order Details</h1>

        <div className="md:flex pt-3 gap-4">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <Orderer
              name="Jamal Ghazali"
              phoneNumber="081234567890"
              email="example@gmail.com"
              className=""
            />

            <div>
              <h1 className="font-semibold text-lg mt-5">Passenger 1</h1>
              <PassengerCard orderer={true} className="mt-3" />
              <h1 className="font-semibold text-lg mt-5">Passengers 2</h1>
              <PassengerCard className="mt-3" />
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <PriceDetail className="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default OrderDetails;
