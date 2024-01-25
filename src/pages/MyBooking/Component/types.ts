import { HTMLAttributes } from 'react';
import { Airport } from '../../Homepage/components/FindTicket/data';

export interface BookingCardProps extends HTMLAttributes<HTMLDivElement> {
  bookingId: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  status: 'PENDING' | 'PROCESS' | 'SENT' | 'FINISH';
}
