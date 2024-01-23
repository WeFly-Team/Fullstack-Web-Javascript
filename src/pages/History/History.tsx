import NoResultCard from '../../components/NoResultCard/NoResultCard';
import BookingCard from '../MyBooking/Component/BookingCard';

const HistoryList = () => {
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Purchase History</h1>
      <NoResultCard
        className="mt-4"
        title="No History Found"
        content="You haven't made any purchases after you made your account"
      />

      <BookingCard status="finish" className="mt-4" />
      <BookingCard status="finish" className="mt-4" />
      <BookingCard status="finish" className="mt-4" />
    </div>
  );
};

export default HistoryList;
