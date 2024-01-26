import BookingDetailCard from '../../components/BookingDetailCard/BookingDetailCard';
import { Airport } from '../Homepage/components/FindTicket/data';

const BookingDetail = () => {
  const departureAirport: Airport = {
    city: 'Jakarta (Tangerang)',
    country: 'Indonesia',
    iata: 'CGK',
    icao: 'WIII',
    id: 5,
    name: 'Soekarno-Hatta International Airport',
    status: true,
  };
  const arrivalAirport: Airport = {
    city: 'Denpasar',
    country: 'Indonesia',
    iata: 'DPS',
    icao: 'WADD',
    id: 7,
    name: 'Ngurah Rai International Airport',
    status: true,
  };
  return (
    <div>
      <BookingDetailCard
        bookingId={12345}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        status="PENDING"
        className="mb-4"
      />
      <BookingDetailCard
        bookingId={12345}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        status="PROCESS"
        className="mb-4"
      />
      <BookingDetailCard
        bookingId={12345}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        status="SENT"
        className="mb-4"
      />
      <BookingDetailCard
        bookingId={12345}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        status="FINISH"
        className="mb-4"
      />
    </div>
  );
};

export default BookingDetail;
