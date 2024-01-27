import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Navbar from '../FlightList/components/Navbar/Navbar';
import Orderer from './Components/Orderer';
import PassengerCard from './Components/PassengerCard';
import PriceDetail from './Components/PriceDetail';
import PaymentMethod from './Components/PaymentMethod';
import TotalPrice from './Components/TotalPrice';
import PaymentDetail from './Components/PaymentDetail';
import Orderpopup from './Components/Orderpopup';
import PassengerPopup from './Components/PassengerPopup';
import { useLocation } from 'react-router-dom';
import { DataFlight, detailPassenger } from '../ProfileLayout/types';
import { OrderDetailContext } from './Components/types';

const OrderDetails = () => {
  const [orderDetail, setOrderDetail] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<boolean>(false);
  const [paymentDetail, setPaymentDetail] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('Order Details');
  const [showOrderPopUp, setShowOrderPopUp] = useState(false);
  const [showPassengerPopUp, setShowPassengerPopUp] = useState(false);
  const [dataFlight, setDataFlight] = useState<DataFlight>();
  const [detailPassenger, setDetailPassenger] = useState<detailPassenger>();
  const location = useLocation();

  const continueOrder = () => {
    setOrderDetail(false);
    setPaymentMethod(true);
    setPaymentDetail(false);
    setPageTitle('Choose Payment Method');
  };

  const payNow = () => {
    setOrderDetail(false);
    setPaymentMethod(false);
    setPaymentDetail(true);
    setPageTitle('');
  };

  useEffect(() => {
    setDataFlight(location.state.data);
    setDetailPassenger(location.state.detailPassenger);
  }, []);

  return (
    <section>
      <Navbar />
      <OrderDetailContext.Provider value={{ dataFlight, detailPassenger }}>
        <div className="lg:container px-4 pt-8 mx-auto">
          <h1 className="font-semibold">{pageTitle}</h1>

          <div className="md:flex pt-3 gap-4">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              {orderDetail && (
                <Orderer
                  name="Jamal Ghazali"
                  phoneNumber="081234567890"
                  email="example@gmail.com"
                  className=""
                  isShow={() => setShowOrderPopUp(true)}
                />
              )}

              {orderDetail && (
                <div>
                  <h1 className="font-semibold text-lg mt-5">Passenger 1</h1>
                  <PassengerCard
                    orderer={true}
                    isShow={() => setShowPassengerPopUp(true)}
                    className="mt-3"
                  />
                  <h1 className="font-semibold text-lg mt-5">Passengers 2</h1>
                  <PassengerCard
                    className="mt-3"
                    isShow={() => setShowPassengerPopUp(true)}
                  />
                </div>
              )}
              {paymentMethod && <PaymentMethod />}

              {paymentDetail && <PaymentDetail continueOrder={continueOrder} />}
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2">
              <PriceDetail className="" />
              {orderDetail && (
                <Button className="w-full mt-5" onClick={continueOrder}>
                  Continue Order
                </Button>
              )}
              {paymentMethod && <TotalPrice payNow={payNow} className="mt-4" />}
            </div>
          </div>
        </div>
        {showOrderPopUp && (
          <Orderpopup
            id="order-popup"
            name="Jamal Ghazali"
            phoneNumber="081234567890"
            email="example@gmail.com"
            gender="Mr"
            className=""
            isClose={() => setShowOrderPopUp(false)}
          />
        )}
        {showPassengerPopUp && (
          <PassengerPopup
            name="Jamal Ghazali"
            gender="Mr"
            className=""
            isClose={() => setShowPassengerPopUp(false)}
          />
        )}
      </OrderDetailContext.Provider>
    </section>
  );
};
export default OrderDetails;
