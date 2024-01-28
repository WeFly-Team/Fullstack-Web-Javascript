import BookingCard from './Component/BookingCard';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { useContext, useEffect } from 'react';
import {
  UserTransactionContext,
  userTransactionContextType,
} from '../ProfileLayout/types';

const MyBooking = () => {
  const { transactions } = useContext(
    UserTransactionContext
  ) as userTransactionContextType;

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Active E-tickets</h1>
      {transactions.length == 0 && (
        <NoResultCard
          title="No Active Bookings Found :("
          content="Anything you booked shows up here, but it seems like you haven't made any. Let's create one via homepage!"
          className="mt-4"
        />
      )}
      {transactions.length != 0 &&
        transactions.map((transaction) => (
          <BookingCard
            key={transaction.id}
            transaction={transaction}
            className="mt-4"
          />
        ))}
    </div>
  );
};

export default MyBooking;
