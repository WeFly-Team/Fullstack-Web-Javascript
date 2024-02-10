import { useEffect, useState } from 'react';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import BookingCard from '../MyBooking/Component/BookingCard';
import axiosInstance from '../../axios/axios';
import { Transaction } from '../ProfileLayout/types';
import { useNavigate, useSearchParams } from 'react-router-dom';

const HistoryList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchBooking = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.get(
        '/transaction/list?size=100&paymentStatus=PAID',
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
    if (searchParams.get('order_id')) {
      const id = searchParams.get('order_id');
      navigate(`/user/history/${id}`);
    } else {
      fetchBooking();
    }
  }, [searchParams]);
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Purchase History</h1>
      {!transactions && (
        <NoResultCard
          className="mt-4"
          title="No History Found"
          content="You haven't made any purchases after you made your account"
        />
      )}

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

export default HistoryList;
