import BookingCard from './Component/BookingCard';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axios';

const MyBooking = () => {
  const [noBooking, setNoBooking] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchBooking = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.get('/transaction/list', {
        headers,
      });
      if (result.data.data.content.length == 0) {
        setNoBooking(true);
      } else {
        setNoBooking(false);
      }
    };
    fetchBooking();
  }, []);
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Active E-tickets</h1>
      {noBooking && (
        <NoResultCard
          title="No Active Bookings Found :("
          content="Anything you booked shows up here, but it seems like you haven't made any. Let's create one via homepage!"
          className="mt-4"
        />
      )}
      {!noBooking && (
        <>
          <BookingCard status="pending" className="mt-4" />
          <BookingCard status="process" className="mt-4" />
          <BookingCard status="sent" className="mt-4" />{' '}
        </>
      )}
    </div>
  );
};

export default MyBooking;
