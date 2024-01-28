import { FaArrowRight } from 'react-icons/fa6';
import { BookingCardProps } from './types';
import { Link } from 'react-router-dom';
import { formatLongDate, thousandSeparator } from '../../../utils/functions';

const BookingCard = ({ transaction, className }: BookingCardProps) => {
  const checkStatus = () => {
    if (transaction.status === 'PENDING') {
      return (
        <div className="font-semibold bg-primary-darkBlue text-center px-8 py-1 text-white rounded-full bg-opacity-75">
          59:45
        </div>
      );
    } else if (transaction.status === 'PROCESS')
      return (
        <div className="bg-secondary-warning font-semibold text-center px-8 py-1 text-white rounded-full">
          Process
        </div>
      );
    else if (transaction.status === 'SENT')
      return (
        <div className="bg-primary-darkBlue font-semibold text-center px-8 py-1 text-white rounded-full ">
          Sent
        </div>
      );
    else if (transaction.status === 'FINISH')
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
          Booking ID : {transaction.id}
        </p>
        <p className="font-bold text-sm">
          Rp {thousandSeparator(transaction.totalPrice)}
        </p>
      </div>
      <div className="p-4 flex items-center justify-between">
        <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
        <div className="flex items-center mt-14">
          <div className="font-semibold ">
            <p>
              {
                transaction.transactionDetails[0].flightClass.flight
                  .departureAirport.city
              }
              ,{' '}
              {
                transaction.transactionDetails[0].flightClass.flight
                  .departureAirport.country
              }
            </p>
            <p className="text-sm text-neutral-06">
              {
                transaction.transactionDetails[0].flightClass.flight
                  .departureAirport.iata
              }{' '}
              -{' '}
              {
                transaction.transactionDetails[0].flightClass.flight
                  .departureAirport.name
              }{' '}
            </p>
          </div>
          <div className="mx-3">
            <FaArrowRight />
          </div>
          <div className="font-semibold">
            <p className="text-right">
              {
                transaction.transactionDetails[0].flightClass.flight
                  .arrivalAirport.city
              }
              ,{' '}
              {
                transaction.transactionDetails[0].flightClass.flight
                  .arrivalAirport.country
              }
            </p>
            <p className="text-sm text-neutral-06">
              {
                transaction.transactionDetails[0].flightClass.flight
                  .arrivalAirport.iata
              }{' '}
              -{' '}
              {
                transaction.transactionDetails[0].flightClass.flight
                  .arrivalAirport.name
              }
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-neutral-08 text-right font-semibold">
            {formatLongDate(
              transaction.transactionDetails[0].flightClass.flight.departureDate!.toString()
            )}
          </p>
          <p className="text-sm text-neutral-08 text-right font-semibold">
            {transaction.transactionDetails[0].flightClass.flight.departureTime}
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
