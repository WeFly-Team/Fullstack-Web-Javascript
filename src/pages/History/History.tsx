import { useContext, useState } from 'react';
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
          if (transaction.status === 'FINISH') {
            setFinishedTransaction(finishedTransaction + 1);
            return (
              <BookingCard
                key={transaction.id}
                status={transaction.status}
                bookingId={transaction.id}
                departureAirport={
                  transaction.transactionDetails[0].flightClass.flight
                    .departureAirport
                }
                arrivalAirport={
                  transaction.transactionDetails[0].flightClass.flight
                    .arrivalAirport
                }
                className="mt-4"
              />
            );
          }
        })}
    </div>
  );
};

export default HistoryList;
