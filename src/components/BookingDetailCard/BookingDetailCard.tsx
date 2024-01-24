import { IoAirplaneOutline } from 'react-icons/io5';
import { BookingCardProps } from '../../pages/MyBooking/Component/types';
import Button from '../Button';

const BookingDetailCard = ({ status, className }: BookingCardProps) => {
  const checkStatus = () => {
    if (status === 'pending') {
      return (
        <div className="flex justify-between gap-2 items-center p-4">
          <Button className="w-auto h-auto py-2 px-6">
            Upload proof of payment
          </Button>
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
    } else if (status === 'process')
      return (
        <div className="flex justify-end gap-2 items-center p-4">
          <p className="text-neutral-06 text-sm font-semibold">Status</p>
          <div className="bg-secondary-warning font-semibold text-center px-8 py-1 text-white rounded-full">
            Process
          </div>
        </div>
      );
    else if (status === 'sent')
      return (
        <div className="flex justify-end gap-2 items-center p-4">
          <p className="text-neutral-06 text-sm font-semibold">Status</p>
          <div className="bg-primary-darkBlue font-semibold text-center px-8 py-1 text-white rounded-full ">
            Sent
          </div>
        </div>
      );
    else if (status === 'finish')
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
          Booking Id : 483649673
        </p>
      </div>
      <div className="p-4 flex justify-between border-b border-neutral-05">
        <div>
          <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
        </div>
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-neutral-06">Jakarta</p>
            <p className="font-semibold">18.45</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-neutral-06 text-sm text-center mt-2">
              Sun, 14 Jan 2024
            </div>
            <div className="">
              <IoAirplaneOutline className=" mx-auto text-primary-blue text-xl bg-white" />
            </div>
            <div className="text-neutral-06 text-sm text-center">
              Duration 3 hours
            </div>
          </div>
          <div>
            <p className="text-neutral-06 text-right">Bali</p>
            <p className="font-semibold text-right">21.45</p>
          </div>
        </div>
        <div className="p-4">
          <div className="text-right">
            <p className="font-semibold">Garuda Indonesia</p>
            <p className="text-sm text-neutral-06">Economy</p>
          </div>
        </div>
      </div>
      {checkStatus()}
    </div>
  );
};

export default BookingDetailCard;
