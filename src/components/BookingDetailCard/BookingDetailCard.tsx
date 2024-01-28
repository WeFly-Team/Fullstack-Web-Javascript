import { IoAirplaneOutline } from 'react-icons/io5';
import { BookingCardProps } from '../../pages/MyBooking/Component/types';
import Button from '../Button';
import {
  formatLongDate,
  substractTime,
  triggerToast,
} from '../../utils/functions';
import { ChangeEvent, useRef } from 'react';
import axiosInstance from '../../axios/axios';
import { AxiosError } from 'axios';

const BookingDetailCard = ({ transaction, className }: BookingCardProps) => {
  const token = localStorage.getItem('token');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
    let formData = new FormData();
    formData.append('file', fileObj);

    try {
      const upload = await axiosInstance.put(
        `savePaymentProof/${transaction.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (upload.data.code == 200) {
        triggerToast('info', 'Payment proof uploaded!');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        triggerToast('error', err.message);
      } else if (err instanceof Error) {
        triggerToast('error', err.message);
      }
    }
  };
  const checkStatus = () => {
    if (transaction.status === 'PENDING') {
      return (
        <div className="flex justify-between gap-2 items-center p-4">
          <Button
            className="w-auto h-auto py-2 px-6"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            Upload proof of payment
          </Button>
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
          />
          <div>
            <p className="text-neutral-06 text-sm font-semibold">
              Please make payment in
            </p>
            <div className="font-semibold bg-primary-darkBlue text-center px-8 py-1 text-white rounded-full bg-opacity-75">
              59:45
            </div>
          </div>
        </div>
      );
    } else if (transaction.status === 'PROCESS')
      return (
        <div className="flex justify-end gap-2 items-center p-4">
          <p className="text-neutral-06 text-sm font-semibold">Status</p>
          <div className="bg-secondary-warning font-semibold text-center px-8 py-1 text-white rounded-full">
            Process
          </div>
        </div>
      );
    else if (transaction.status === 'SENT')
      return (
        <div className="flex justify-end gap-2 items-center p-4">
          <p className="text-neutral-06 text-sm font-semibold">Status</p>
          <div className="bg-primary-darkBlue font-semibold text-center px-8 py-1 text-white rounded-full ">
            Sent
          </div>
        </div>
      );
    else if (transaction.status === 'FINISH')
      return (
        <div className="flex justify-end gap-2 items-center p-4">
          <p className="text-neutral-06 text-sm font-semibold">Status</p>
          <div className="bg-secondary-success font-semibold text-center px-8 py-1 text-white rounded-full ">
            Purchase Successfull
          </div>
        </div>
      );
  };
  return (
    <div
      className={`border border-neutral-05 shadow-card rounded-lg ${className}`}
    >
      <div className="p-4 border-b border-neutral-05">
        <p className="text-center font-semibold text-lg">
          Booking Id : {transaction.id}
        </p>
      </div>
      <div className="p-4 flex justify-between border-b border-neutral-05">
        <div>
          <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
        </div>
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="font-semibold">
              {
                transaction.transactionDetails[0].flightClass.flight
                  .departureAirport.city
              }
            </p>
            <p className="font-semibold">
              {
                transaction.transactionDetails[0].flightClass.flight
                  .departureTime
              }
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-neutral-06 text-sm text-center mt-2">
              {formatLongDate(
                transaction.transactionDetails[0].flightClass.flight.departureDate!.toString()
              )}
            </div>
            <div className="">
              <IoAirplaneOutline className=" mx-auto text-primary-blue text-xl bg-white" />
            </div>
            <div className="text-neutral-06 text-sm text-center">
              Duration{' '}
              {substractTime(
                transaction.transactionDetails[0].flightClass.flight
                  .arrivalTime,
                transaction.transactionDetails[0].flightClass.flight
                  .departureTime
              )}
            </div>
          </div>
          <div>
            <p className="font-semibold text-right">
              {
                transaction.transactionDetails[0].flightClass.flight
                  .arrivalAirport.city
              }
            </p>
            <p className="font-semibold text-right">
              {transaction.transactionDetails[0].flightClass.flight.arrivalTime}
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="text-right">
            <p className="font-semibold">
              {
                transaction.transactionDetails[0].flightClass.flight.airplane
                  .airline.name
              }
            </p>
            <p className="text-sm text-neutral-06">{transaction.seatClass}</p>
          </div>
        </div>
      </div>
      {checkStatus()}
    </div>
  );
};

export default BookingDetailCard;
