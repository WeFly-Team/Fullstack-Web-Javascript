import { useContext, useEffect, useState } from 'react';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import BookingCard from '../MyBooking/Component/BookingCard';
import {
  UserTransactionContext,
  userTransactionContextType,
} from '../ProfileLayout/types';

const HistoryList = () => {
  const { transactions } = useContext(
    UserTransactionContext
  ) as userTransactionContextType;

  useEffect(() => {
    const finishedCount = transactions.filter(
      (t) => t.payment?.transaction_status === 'PAID'
    ).length;
    setFinishedTransaction(finishedCount);
  }, [transactions]);
  const [finishedTransaction, setFinishedTransaction] = useState<number>(0);
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Purchase History</h1>
      {finishedTransaction == 0 && (
        <NoResultCard
          className="mt-4"
          title="No History Found"
          content="You haven't made any purchases after you made your account"
        />
      )}

      {transactions.length != 0 &&
        transactions.map((transaction) => {
          if (transaction.payment) {
            if (transaction.payment.transaction_status === 'PAID') {
              return (
                <BookingCard
                  key={transaction.id}
                  transaction={transaction}
                  className="mt-4"
                />
              );
            }
          }
        })}
    </div>
  );
};

export default HistoryList;
