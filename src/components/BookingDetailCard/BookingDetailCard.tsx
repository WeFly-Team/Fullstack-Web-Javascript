import { useEffect, useState } from 'react';
import { IoAirplaneOutline } from 'react-icons/io5';
import { BookingCardProps } from '../../pages/MyBooking/Component/types';
import {
  calculateTimeRemaining,
  formatLongDate,
  substractTime,
  thousandSeparator,
} from '../../utils/functions';
import Button from '../Button';

const BookingDetailCard = ({ transaction, className }: BookingCardProps) => {
  const openPaymentLink = () => {
    const token = transaction.payment.token;
    window.open(
      `https://app.sandbox.midtrans.com/snap/v3/redirection/${token}`,
      '_blank',
      'noreferrer'
    );
  };

  const [timeRemaining, setTimeRemaining] = useState<string>('');

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

      // Schedule the next update after 1 second
      if (minutes === '00' && seconds === '00') {
        clearInterval(intervalId);
      } else {
        // Schedule the next update after 1 second
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
        <div className="flex flex-col sm:flex-row justify-between gap-2 items-center p-4">
          <Button
            className="w-full sm:w-auto h-auto py-2 px-6"
            onClick={openPaymentLink}
          >
            Open Payment Link
          </Button>
          <div>
            <p className="text-neutral-06 text-sm font-semibold">
              Please make payment in
            </p>
            <div className="font-semibold bg-primary-darkBlue text-center px-8 py-1 text-white rounded-full bg-opacity-75">
              {timeRemaining}
            </div>
          </div>
        </div>
      );
    } else if (transaction.payment.transaction_status === 'PENDING')
      return (
        <div className="flex justify-between gap-2 items-center p-4">
          <Button className="w-auto h-auto py-2 px-6" onClick={openPaymentLink}>
            Open Payment Link
          </Button>
          <div className="flex items-center gap-2">
            <p className="text-neutral-06 text-sm font-semibold">Status</p>
            <div className="bg-secondary-warning font-semibold text-center px-8 py-1 text-white rounded-full">
              Choosing Payment
            </div>
          </div>
        </div>
      );
    else if (transaction.payment.transaction_status === 'EXPIRE')
      return (
        <div className="flex justify-end gap-2 items-center p-4">
          <p className="text-neutral-06 text-sm font-semibold">Status</p>
          <div className="bg-secondary-danger font-semibold text-center px-8 py-1 text-white rounded-full ">
            EXPIRED
          </div>
        </div>
      );
  };
  return (
    <div
      className={`border border-neutral-05 shadow-card rounded-lg ${className}`}
    >
      <div className="p-4 border-b border-neutral-05 flex items-center justify-between">
        <p className="font-semibold text-lg">Booking Id : {transaction.id}</p>
        <p className="font-semibold text-lg">
          Rp{thousandSeparator(transaction.totalPrice)}
        </p>
      </div>
      <div className="p-4 flex justify-between sm:border-b sm:border-neutral-05">
        <div>
          <img
            src="https://res.cloudinary.com/dwy823csd/image/upload/v1736875160/image_14_1.png"
            alt="logo"
          />
        </div>
        <div className="hidden sm:flex items-center justify-center gap-8">
          <div>
            <p className="font-semibold">
              {
                transaction.transactionDetails[0].flightClass.flightSchedule
                  .flight.departureAirport.city
              }
            </p>
            <p className="font-semibold">
              {
                transaction.transactionDetails[0].flightClass.flightSchedule
                  .flight.departureTime
              }
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-neutral-06 text-sm text-center mt-2">
              {formatLongDate(
                transaction.transactionDetails[0].flightClass.flightSchedule.departureDate!.toString()
              )}
            </div>
            <div className="">
              <IoAirplaneOutline className=" mx-auto text-primary-blue text-xl bg-white" />
            </div>
            <div className="text-neutral-06 text-sm text-center">
              Duration{' '}
              {substractTime(
                transaction.transactionDetails[0].flightClass.flightSchedule
                  .flight.arrivalTime,
                transaction.transactionDetails[0].flightClass.flightSchedule
                  .flight.departureTime
              )}
            </div>
          </div>
          <div>
            <p className="font-semibold text-right">
              {
                transaction.transactionDetails[0].flightClass.flightSchedule
                  .flight.arrivalAirport.city
              }
            </p>
            <p className="font-semibold text-right">
              {
                transaction.transactionDetails[0].flightClass.flightSchedule
                  .flight.arrivalTime
              }
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="text-right">
            <p className="font-semibold">
              {
                transaction.transactionDetails[0].flightClass.flightSchedule
                  .flight.airplane.airline.name
              }
            </p>
            <p className="text-sm text-neutral-06">{transaction.seatClass}</p>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden items-center justify-center gap-8 px-4 border-b border-neutral-05 pb-4">
        <div>
          <p className="font-semibold">
            {
              transaction.transactionDetails[0].flightClass.flightSchedule
                .flight.departureAirport.city
            }
          </p>
          <p className="font-semibold">
            {
              transaction.transactionDetails[0].flightClass.flightSchedule
                .flight.departureTime
            }
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-neutral-06 text-sm text-center mt-2">
            {formatLongDate(
              transaction.transactionDetails[0].flightClass.flightSchedule.departureDate!.toString()
            )}
          </div>
          <div className="">
            <IoAirplaneOutline className=" mx-auto text-primary-blue text-xl bg-white" />
          </div>
          <div className="text-neutral-06 text-sm text-center">
            Duration{' '}
            {substractTime(
              transaction.transactionDetails[0].flightClass.flightSchedule
                .flight.arrivalTime,
              transaction.transactionDetails[0].flightClass.flightSchedule
                .flight.departureTime
            )}
          </div>
        </div>
        <div>
          <p className="font-semibold text-right">
            {
              transaction.transactionDetails[0].flightClass.flightSchedule
                .flight.arrivalAirport.city
            }
          </p>
          <p className="font-semibold text-right">
            {
              transaction.transactionDetails[0].flightClass.flightSchedule
                .flight.arrivalTime
            }
          </p>
        </div>
      </div>
      {checkStatus()}
    </div>
  );
};

export default BookingDetailCard;
