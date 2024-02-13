import { useEffect, useState } from 'react';
import Navbar from '../FlightList/components/Navbar/Navbar';
import Orderer from './Components/Orderer';
import PassengerCard from './Components/PassengerCard';
import PriceDetail from './Components/PriceDetail';
import PaymentMethod from './Components/PaymentMethod';
import TotalPrice from './Components/TotalPrice';
import PaymentDetail from './Components/PaymentDetail';
import Orderpopup from './Components/Orderpopup';
import PassengerPopup from './Components/PassengerPopup';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataFlight, Passenger, detailPassenger } from '../ProfileLayout/types';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  Bank,
  OrderDetailContext,
  OrderDetailOrderer,
} from './Components/types';
import {
  capitalizeFirstLetter,
  extractNames,
  formatDdMmYyyy,
  getTotalPrice,
  triggerToast,
} from '../../utils/functions';
import { useAuth } from '../../customHooks/useAuth/useAuth';
import axiosInstance from '../../axios/axios';
import { AxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';

const OrderDetails = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const banks: Bank[] = [
    {
      id: 1,
      label: 'Bank Bca',
      img: 'https://i.ibb.co/FqLmvmB/logo-bca.png',
      alt: 'logo-bca',
    },
    {
      id: 4,
      label: 'Bank Bni',
      img: 'https://i.ibb.co/8g6ydLs/logo-bni.png',
      alt: 'logo-bni',
    },
    {
      id: 3,
      label: 'Bank Bri',
      img: 'https://i.ibb.co/m6Pckrb/logo-bri.png',
      alt: 'logo-bri',
    },
    {
      id: 2,
      label: 'Bank Mandiri',
      img: 'https://i.ibb.co/ZVk3Dwn/logo-mandiri.png"',
      alt: 'logo-mandiri',
    },
  ];
  const [selectedBank, setSelectedBank] = useState<Bank>(banks[0]);
  const [orderDetail, setOrderDetail] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<boolean>(false);
  const [paymentDetail, setPaymentDetail] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('Order Details');
  const [showOrderPopUp, setShowOrderPopUp] = useState(false);
  const [showPassengerPopUp, setShowPassengerPopUp] = useState(false);
  const [dataFlight, setDataFlight] = useState<DataFlight>();
  const [detailPassenger, setDetailPassenger] = useState<detailPassenger>();
  const [disabledContinueOrder, setDisabledContinueOrder] =
    useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderer, setOrderer] = useState<OrderDetailOrderer>();
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger>();

  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();

  const selectPassenger = (passenger: Passenger) => {
    setSelectedPassenger(passenger);
  };

  const continueOrder = () => {
    setOrderDetail(false);
    setPaymentMethod(true);
    setPaymentDetail(false);
    setPageTitle('Choose Payment Method');
  };

  const payNow = async () => {
    if (detailPassenger) {
      const flightClassId = id;
      const adultPassenger: number = detailPassenger.adult;
      const childPassenger: number = detailPassenger.child;
      const infantPassenger: number = 0;
      const formatedPassengers = passengers.map((passenger) => {
        const [year, month, day] = passenger
          .dateOfBirth!.toString()
          .split('-')
          .map(Number);
        return {
          ...passenger,
          passengerType: passenger.passengerType?.toUpperCase(),
          dateOfBirth: formatDdMmYyyy(day.toString(), month.toString(), year),
        };
      });
      // return;
      const data = {
        adultPassenger,
        childPassenger,
        infantPassenger,
        passengers: formatedPassengers,
        orderer,
        transactionDetails: [
          {
            flightClassId,
          },
        ],
      };
      try {
        const makeTransaction = await axiosInstance.post(
          '/transaction/save',
          data,
          {
            headers,
          }
        );
        if (makeTransaction.data.code == 200) {
          const transactionId = makeTransaction.data.data.transaction.id;
          const redirectUrl = makeTransaction.data.data.redirect_url;
          window.open(redirectUrl, '_blank', 'noreferrer');
          triggerToast('info', 'Please finish your payment!');
          navigate('/user/my-booking/' + transactionId);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          triggerToast('error', err.message);
        } else if (err instanceof Error) {
          triggerToast('error', err.message);
        }
      }
    }

    // setOrderDetail(false);
    // setPaymentMethod(false);
    // setPaymentDetail(true);
    // setPageTitle('');
  };

  const saveOrderer = (orderer: OrderDetailOrderer) => {
    setOrderer(orderer);
  };

  const savePassenger = (updatePassenger: Passenger) => {
    const newPassengers = passengers.map((passenger) => {
      if (passenger.id === updatePassenger.id) {
        return { ...passenger, ...updatePassenger };
      } else {
        return passenger;
      }
    });
    setPassengers(newPassengers);
  };

  useEffect(() => {
    if (location.state) {
      setDataFlight(location.state.data);
      setDetailPassenger(location.state.detailPassenger);
    } else {
      throw new Response('Not Found', { status: 404 });
    }
  }, []);

  useEffect(() => {
    if (detailPassenger && dataFlight) {
      setTotalPrice(
        getTotalPrice(
          detailPassenger.adult,
          detailPassenger.child,
          dataFlight.basePriceAdult,
          dataFlight.basePriceChild
        )
      );
    }
  }, [dataFlight, detailPassenger]);

  useEffect(() => {
    if (orderer && passengers) {
      if (
        orderer.email &&
        orderer.firstName &&
        orderer.lastName &&
        orderer.fullName &&
        orderer.phoneNumber &&
        orderer.type
      ) {
        const areAllPassengersValid = passengers.every((passenger) => {
          return (
            passenger.firstName.trim() !== '' &&
            (passenger.lastName === undefined ||
              passenger.lastName.trim() !== '') &&
            (passenger.nationality === undefined ||
              passenger.nationality.trim() !== '') &&
            (passenger.dateOfBirth === undefined ||
              passenger.dateOfBirth.trim() !== '') &&
            (passenger.passengerType === undefined ||
              passenger.passengerType.trim() !== '') &&
            (passenger.gender === undefined || passenger.gender.trim() !== '')
          );
        });
        if (areAllPassengersValid) {
          setDisabledContinueOrder(false);
        } else {
          setDisabledContinueOrder(true);
        }
      } else {
        setDisabledContinueOrder(true);
      }
    }
  }, [orderer, passengers]);

  useEffect(() => {
    // add adult passengers
    const arrPassenger = passengers;
    let id = 1;
    if (detailPassenger) {
      for (let i = 0; i < detailPassenger.adult; i++) {
        arrPassenger.push({
          id,
          firstName: 'Please insert this passenger information!',
          lastName: '',
          nationality: '',
          passengerType: 'adult',
        });
        id++;
      }

      if (detailPassenger.child > 0) {
        for (let i = 0; i < detailPassenger.child; i++) {
          arrPassenger.push({
            id,
            firstName: 'Please insert this passenger information!',
            lastName: '',
            nationality: '',
            passengerType: 'child',
          });
          id++;
        }
      }
    }
  }, [detailPassenger]);
  useEffect(() => {
    if (user) {
      const { firstName, lastName } = extractNames(user.full_name);
      setOrderer({
        email: user.user_name,
        fullName: user.full_name,
        phoneNumber: user.phone_number,
        dateOfBirth: user.date_of_birth,
        firstName,
        lastName,
        type: 'Mr',
      });
    }
  }, [user]);
  return (
    <section>
      <Navbar />
      <OrderDetailContext.Provider
        value={{
          dataFlight,
          detailPassenger,
          totalPrice,
          orderer,
          saveOrderer,
          savePassenger,
        }}
      >
        <div className="lg:container px-4 py-8 mx-auto">
          <h1 className="font-semibold">{pageTitle}</h1>

          <div className="md:flex pt-3 gap-4">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              {orderDetail && orderer && (
                <Orderer className="" isShow={() => setShowOrderPopUp(true)} />
              )}

              {orderDetail && (
                <div className="mb-4">
                  {passengers &&
                    passengers.map((passenger, index) => (
                      <div key={index}>
                        <h1 className="font-semibold text-lg mt-5">
                          Passenger {passenger.id} (
                          {capitalizeFirstLetter(passenger.passengerType!)})
                        </h1>
                        <PassengerCard
                          selectPassenger={selectPassenger}
                          passenger={passenger}
                          asOrderer={passenger.id == 1 ? true : false}
                          isShow={() => setShowPassengerPopUp(true)}
                          className="mt-3"
                        />
                      </div>
                    ))}
                </div>
              )}
              {paymentMethod && (
                <PaymentMethod
                  banks={banks}
                  setSelectedBank={setSelectedBank}
                  selectedBank={selectedBank}
                />
              )}

              {paymentDetail && <PaymentDetail continueOrder={continueOrder} />}
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2">
              <PriceDetail className="" />
              {/* {orderDetail && (
                <Button
                  className="w-full mt-5 disabled:opacity-30"
                  disabled={disabledContinueOrder}
                  onClick={continueOrder}
                >
                  Continue Order
                </Button>
              )} */}
              {orderDetail && (
                <TotalPrice
                  disabledContinueOrder={disabledContinueOrder}
                  payNow={payNow}
                  className="mt-4"
                />
              )}
            </div>
          </div>
        </div>
        {showOrderPopUp && (
          <Orderpopup className="" isClose={() => setShowOrderPopUp(false)} />
        )}
        {showPassengerPopUp && (
          <PassengerPopup
            passenger={selectedPassenger ? selectedPassenger : undefined}
            className=""
            isClose={() => {
              setSelectedPassenger(undefined);
              setShowPassengerPopUp(false);
            }}
          />
        )}
      </OrderDetailContext.Provider>
      <ToastContainer />
    </section>
  );
};
export default OrderDetails;
