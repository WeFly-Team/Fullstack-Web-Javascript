import { FaArrowRight } from 'react-icons/fa6';
import { BookingCardProps } from './types';
import { Link } from 'react-router-dom';
import {
  calculateTimeRemaining,
  formatLongDate,
  thousandSeparator,
} from '../../../utils/functions';
import { useEffect, useState } from 'react';

const BookingCard = ({ transaction, className }: BookingCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>(
    'Please Choose Your Payment'
  );

  useEffect(() => {
    let intervalId: number;

    const updateTimer = () => {
      const expiryDate = new Date(transaction.payment.expiry_time);
      if (transaction.payment.issuer) {
        expiryDate.setHours(expiryDate.getHours());
      } else {
        expiryDate.setHours(expiryDate.getHours());
      }

      const { minutes, seconds } = calculateTimeRemaining(expiryDate);

      setTimeRemaining(`${minutes}:${seconds}`);

      if (minutes === '00' && seconds === '00') {
        clearInterval(intervalId);
        setStatusMessage('EXPIRED!');
      } else {
        intervalId = setTimeout(updateTimer, 1000);
      }
    };

    if (transaction.payment.transaction_status === 'CHOOSING_PAYMENT') {
      updateTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [transaction.payment.expiry_time, transaction.payment.transaction_status]);

  const checkStatus = () => {
    if (transaction.payment.transaction_status === 'CHOOSING_PAYMENT') {
      return (
        <div className="flex items-center">
          <div className="font-semibold bg-primary-darkBlue text-center px-8 py-1 text-white rounded-full bg-opacity-75">
            {timeRemaining}
          </div>
          <p className="font-semibold text-sm ml-3 text-secondary-danger">
            {statusMessage}
          </p>
        </div>
      );
    } else if (transaction.payment.transaction_status === 'PENDING')
      return (
        <div className="bg-secondary-warning font-semibold text-center px-8 py-1 text-white rounded-full">
          Choosing Payment
        </div>
      );
    else if (transaction.payment.transaction_status === 'EXPIRE')
      return (
        <div className="bg-secondary-danger font-semibold text-center px-8 py-1 text-white rounded-full ">
          EXPIRED
        </div>
      );
    else if (transaction.payment.transaction_status === 'PAID')
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
            <p className="text-sm text-neutral-06 text-right">
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
        {transaction.payment.transaction_status !== 'PAID' && (
          <Link
            to={`/user/my-booking/${transaction.id}`}
            className="text-primary-darkBlue font-semibold"
          >
            View
          </Link>
        )}
        {transaction.payment.transaction_status === 'PAID' && (
          <Link
            to={`/user/history/${transaction.id}`}
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
