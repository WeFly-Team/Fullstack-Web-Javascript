import BookingCard from './Component/BookingCard';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { useEffect, useState } from 'react';
import { Transaction } from '../ProfileLayout/types';
import axiosInstance from '../../axios/axios';

const MyBooking = () => {
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchBooking = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.get(
        '/transaction/list?size=100&exceptionStatus=PAID',
        {
          headers,
        }
      );
      const unsortedTransaction = result.data.data.content;
      const sortedTransactions = unsortedTransaction.sort(
        (a: Transaction, b: Transaction) => b.id - a.id
      );

      setTransactions(sortedTransactions);
    };
    fetchBooking();
  }, []);

  return (
    <div className="">
      <h1 className="font-bold text-2xl">My Transactions</h1>
      {!transactions ||
        (transactions.length == 0 && (
          <NoResultCard
            title="No Active Bookings Found :("
            content="Anything you booked shows up here, but it seems like you haven't made any. Let's create one via homepage!"
            className="mt-4"
          />
        ))}
      {transactions &&
        transactions.map((transaction) => {
          if (transaction.payment) {
            return (
              <BookingCard
                key={transaction.id}
                transaction={transaction}
                className="mt-4"
              />
            );
          }
        })}
    </div>
  );
};

export default MyBooking;
