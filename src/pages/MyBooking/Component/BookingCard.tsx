import { FaArrowRight } from 'react-icons/fa6';
import { BookingCardProps } from './types';
import { Link } from 'react-router-dom';

const BookingCard = ({
  bookingId,
  departureAirport,
  arrivalAirport,
  className,
  status,
}: BookingCardProps) => {
  const checkStatus = () => {
    if (status === 'PENDING') {
      return (
        <div className="font-semibold bg-primary-darkBlue text-center px-8 py-1 text-white rounded-full bg-opacity-75">
          59:45
        </div>
      );
    } else if (status === 'PROCESS')
      return (
        <div className="bg-secondary-warning font-semibold text-center px-8 py-1 text-white rounded-full">
          Process
        </div>
      );
    else if (status === 'SENT')
      return (
        <div className="bg-primary-darkBlue font-semibold text-center px-8 py-1 text-white rounded-full ">
          Sent
        </div>
      );
    else if (status === 'FINISH')
      return (
        <div className="bg-secondary-success font-semibold text-center px-8 py-1 text-white rounded-full ">
          Purchase Successfull
        </div>
      );
  };

  return (
    <div
      className={`border border-neutral-05 rounded-lg gap-4 shadow-card ${className}`}
    >
      <div className="border-b-2 border-dashed py-2 px-4 border-b-neutral-05 flex items-center justify-between">
        <p className="font-semibold text-neutral-06 text-sm">
          Booking ID : {bookingId}
        </p>
        <p className="font-bold text-sm">Rp 1.150.000</p>
      </div>
      <div className="p-4 flex items-center justify-between">
        <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
        <div className="flex items-center mt-14">
          <div className="font-semibold ">
            <p>
              {departureAirport.city}, {departureAirport.country}
            </p>
            <p className="text-sm text-neutral-06">
              {departureAirport.airportCode} - {departureAirport.name}{' '}
            </p>
          </div>
          <div className="mx-3">
            <FaArrowRight />
          </div>
          <div className="font-semibold">
            <p>
              {arrivalAirport.city}, {arrivalAirport.country}
            </p>
            <p className="text-sm text-neutral-06">
              {arrivalAirport.airportCode} - {arrivalAirport.name}{' '}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-neutral-08 text-right font-semibold">
            Sun, 13 Jan 2023
          </p>
          <p className="text-sm text-neutral-08 text-right font-semibold">
            14.00
          </p>
        </div>
      </div>
      <div className="flex p-4 justify-between items-center">
        {checkStatus()}
        {status !== 'FINISH' && (
          <Link
            to="/user/my-booking/tiket"
            className="text-primary-darkBlue font-semibold"
          >
            View
          </Link>
        )}
        {status === 'FINISH' && (
          <Link
            to="/user/history/13124"
            className="text-primary-darkBlue font-semibold"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
