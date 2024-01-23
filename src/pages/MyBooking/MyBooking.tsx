import BookingCard from './Component/BookingCard';
import NoResultCard from '../../components/NoResultCard/NoResultCard';

const MyBooking = () => {
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Active E-tickets</h1>
      <NoResultCard
        title="No Active Bookings Found :("
        content="Anything you booked shows up here, but it seems like you haven't made any. Let's create one via homepage!"
        className="mt-4"
      />
      <BookingCard status="pending" className="mt-4" />
      <BookingCard status="process" className="mt-4" />
      <BookingCard status="sent" className="mt-4" />
    </div>
  );
};

export default MyBooking;
