import BookingDetailCard from '../../components/BookingDetailCard/BookingDetailCard';

const BookingDetail = () => {
  return (
    <div>
      <BookingDetailCard status="pending" className="mb-4" />
      <BookingDetailCard status="process" className="mb-4" />
      <BookingDetailCard status="sent" className="mb-4" />
      <BookingDetailCard status="finish" className="mb-4" />
    </div>
  );
};

export default BookingDetail;
