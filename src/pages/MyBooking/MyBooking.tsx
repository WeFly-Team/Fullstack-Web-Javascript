import { HTMLAttributes } from 'react';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import BookingCard from './Component/BookingCard';

const NoResultCard = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`p-5 border border-neutral-05 rounded-lg shadow-card flex gap-4 ${className}`}
    >
      <div>
        <FaRegFaceSadTear className="text-primary-blue text-6xl" />
      </div>
      <div>
        <h1 className="font-semibold text-lg">No Active Bookings Found :(</h1>
        <p className="font-medium mt-2 text-sm">
          Anything you booked shows up here, but it seems like you haven't made
          any. Let's create one via homepage!
        </p>
      </div>
    </div>
  );
};

const MyBooking = () => {
  return (
    <div className="px-5">
      <h1 className="font-bold text-2xl">Active E-tickets</h1>
      <NoResultCard className="mt-4" />
      <BookingCard status="pending" className="mt-4" />
      <BookingCard status="process" className="mt-4" />
      <BookingCard status="sent" className="mt-4" />
    </div>
  );
};

export default MyBooking;
